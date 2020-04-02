from utils import Tempest
from pprint import pprint

tp = Tempest()
data = tp.get_json_records("../data/JSON/corona2020_2561gens.json")['data']

tp.jsonarr_to_fasta(data, "../data/FASTA/corona2020_2561gens.fasta")