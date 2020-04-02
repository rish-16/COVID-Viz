#!/usr/bin/env python 
#-*- coding: utf-8 -*-

from utils import Tempest, Mutant, Geocoder
import json, os
from pprint import pprint
from collections import Counter

tp = Tempest()
gc = Geocoder()
mt = Mutant()

data = tp.get_json_records("../data/JSON/corona2020_2561gens_final.json")

diffs = []
for i in range(len(data['data'])):
    for j in range(len(data['data'])):
        if data['data'][i]['covv_virus_name'] != data['data'][j]['covv_virus_name']:
            nuc_diff = mt.get_nuc_diff(data['data'][i]['aligned_sequence'], data['data'][j]['aligned_sequence'])
            dist = gc.get_geo_dist(data['data'][i]['covv_coords'], data['data'][j]['covv_coords'], "K")
            diffs.append({
                "source": data['data'][i]['covv_virus_name'],
                "target": data['data'][j]['covv_virus_name'],
                "nuc_diff": nuc_diff,
                "geo_dist_K": dist
            })

data['pwNucDiff'] = diffs

tp.save_dict(data, "../data/JSON/corona2020_2561gens_final.json")