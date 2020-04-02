#!/usr/bin/env python 
#-*- coding: utf-8 -*-

from utils import Tempest, Mutant, Geocoder
import os, json, sys, re, string, bz2
import numpy as np 
import pandas as pd
from zipfile import ZipFile

tp = Tempest()
gc = Geocoder()
mt = Mutant()

# run Cron job to get most recent JSON
os.system("/usr/bin/curl -O -u lizijun:oaJuzwgG https://www.epicov.org/epi3/3p/corona2020/export/corona2020_export.json.bz2")
if not os.path.exists("./data") and not os.path.exist("./data/JSON") and not os.path.exist("./data/FASTA") and not os.path.exist("./data/MISC"):
    os.system("data")
    os.system("./data/JSON")
    os.system("./data/FASTA")
    os.system("./data/MISC")

# unzip and extra JSON
filepath = "corona2020_export.json.bz2"
zipfile = bz2.BZ2File(filepath)
data = zipfile.read()
newfilepath = "./data/JSON/" + filepath[:-4]
open(newfilepath, 'wb').write(data)

# mend json 
with open("./data/JSON/corona2020_export.json") as f:
    data = f.read().strip().split("\n")
    data = [data[i].strip() for i in range(len(data))]

for i in range(len(data)):
    data[i] = data[i].replace("}", "},")

data[-1] = data[-1].replace("},", "}]}")
data[0] = '{"data": [' + data[0]

with open("./data/JSON/corona2020_export.json", "w") as f:
    for i in range(len(data)):
        f.write(data[i] + "\n")

# read mended JSON and write sequences to FASTA
with open("./data/JSON/corona2020_export.json") as f:
    final_data = json.load(f)

tp.jsonarr_to_fasta(final_data['data'], "./data/FASTA/corona2020_exports.fasta")

# run alignment
os.system("mafft --thread -1 --nomemsave data/FASTA/corona2020_exports.fasta > data/FASTA/corona2020_exports_aligned.fasta")

# include sequences in master JSON
aligned_fasta_records = tp.get_fasta_records("./data/FASTA/corona2020_exports_aligned.fasta")

for i in range(len(final_data['data'])):
    for j in range(len(aligned_fasta_records)):
        if final_data['data'][i]['covv_virus_name'] == aligned_fasta_records[j]['header'].strip(">"):
            try:
                del final_data['data'][i]['aligned_seqeunce']
            except:
                pass
            final_data['data'][i]['aligned_sequence'] = aligned_fasta_records[j]['sequence']

tp.save_dict(final_data, "./data/JSON/corona2020_exports_final.json")

# get nucleotide differences
final_data = tp.get_json_records("./data/JSON/corona2020_exports_final.json")
diffs = []
for i in range(len(final_data['data'])):
    for j in range(len(dafinal_datata['data'])):
        if data['data'][i]['covv_virus_name'] != data['data'][j]['covv_virus_name']:
            nuc_diff = mt.get_nuc_diff(final_data['data'][i]['aligned_sequence'], final_data['data'][j]['aligned_sequence'])
            dist = gc.get_geo_dist(final_data['data'][i]['covv_coords'], final_data['data'][j]['covv_coords'], "K")
            diffs.append({
                "source": final_data['data'][i]['covv_virus_name'],
                "target": final_data['data'][j]['covv_virus_name'],
                "nuc_diff": nuc_diff,
                "geo_dist_K": dist
            })

final_data['pwNuccDiff'] = diffs

# geocode locations
for i in range(len(data['data'])):
    loc = data['data'][i]['covv_location']
    all_locs |= {loc}

all_locs = list(all_locs)

coords_lookup = {}

all_locs = set()

for i in range(len(data['data'])):
    loc = data['data'][i]['covv_location']
    all_locs |= {loc}

all_locs = list(all_locs)
coords_lookup = {}

for i in range(len(all_locs)):
    loc = all_locs[i]
    coords = gc.geocode(loc)
    coords_lookup[loc] = coords

for i in range(len(data['data'])):
    loc = data['data'][i]['covv_location']
    coords = coords_lookup[loc]
    data['data'][i]['covv_coords'] = coords

tp.save_dict(final_data, "./data/JSON/corona2020_exports_final.json")

# update frontend automatically