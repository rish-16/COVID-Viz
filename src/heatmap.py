import matplotlib.pyplot as plt
import numpy as np
from utils import Tempest, Mutant

tp = Tempest()
mt = Mutant()

data = tp.get_json_records("../data/JSON/corona2020_2561gens.json")['data']
keyword = "USA"

data = [data[i] for i in range(len(data)) if data[i]['covv_host'] == "Human"]
names = [data[i]['covv_virus_name'] for i in range(len(data)) if keyword in data[i]['covv_location']]
diffs = []

for i in range(len(names)):
    temp = []
    for j in range(len(names)):
        nuc_diff = mt.get_nuc_diff(data[i]['aligned_sequence'], data[j]['aligned_sequence'])
        temp.append(nuc_diff)
    diffs.append(temp)

diffs = np.array(diffs)

try:
    np.save("../data/MISC/nuc_diff.npy", diffs)
except:
    pass

fig, ax = plt.subplots()
im = ax.imshow(diffs)

ax.set_xticks(np.arange(len(names)))
ax.set_yticks(np.arange(len(names)))

ax.set_xticklabels(names)
ax.set_yticklabels(names)

plt.setp(ax.get_xticklabels(), rotation=45, ha="right", rotation_mode="anchor")

for i in range(len(names)):
    for j in range(len(names)):
        text = ax.text(j, i, diffs[i, j], ha="center", va="center", color="w")

ax.set_title("Nucleotide differences between COVID-19 genomes")
fig.tight_layout()
figManager = plt.get_current_fig_manager()
figManager.full_screen_toggle()
plt.show()