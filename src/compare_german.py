from utils import Tempest, Mutant

tp = Tempest()
data = tp.get_fasta_records("../data/FASTA/COVID_merged_aligned.fasta")

mt = Mutant()
og_name = data[0]['header'].strip(">")
og_seq = data[0]['sequence']

german_gens = []
syn_muts = {}
syn_muts["muts_from_og"] = {}

for i in range(1, len(data)):
    if 'germany' in data[i]['header'].lower():
        german_gens.append(data[i])

for gen in german_gens:
    seq = gen['sequence']
    name = gen['header'].strip(">")

    # ORF1a
    og_orf1a_nuc = mt.extract_segment(og_seq, 266, 13468)
    ref_orf1a_nuc = mt.extract_segment(seq, 266, 13468)

    og_orf1a = mt.translate(og_orf1a_nuc)
    ref_orf1a = mt.translate(ref_orf1a_nuc)

    orf1a_mutations = mt.get_mutations(og_orf1a, ref_orf1a, 266, "ORF1a")

    # ORF1ab
    og_orf1ab_nuc = mt.extract_segment(og_seq, 13468, 21555)
    ref_orf1ab_nuc = mt.extract_segment(seq, 13468, 21555)

    og_orf1ab = mt.translate(og_orf1ab_nuc)
    ref_orf1ab = mt.translate(ref_orf1ab_nuc)

    orf1ab_mutations = mt.get_mutations(og_orf1ab, ref_orf1ab, 13468, "ORF1ab")

    # S
    og_S_nuc = mt.extract_segment(og_seq, 21563, 25384)
    ref_S_nuc = mt.extract_segment(seq, 21563, 25384)

    og_S = mt.translate(og_S_nuc)
    ref_S = mt.translate(ref_S_nuc)

    S_mutations = mt.get_mutations(og_S, ref_S, 21563, "S")

    # NS3
    og_NS3_nuc = mt.extract_segment(og_seq, 25393, 26220)
    ref_NS3_nuc = mt.extract_segment(seq, 25393, 26220)

    og_NS3 = mt.translate(og_NS3_nuc)
    ref_NS3 = mt.translate(ref_NS3_nuc)

    NS3_mutations = mt.get_mutations(og_NS3, ref_NS3, 25393, "NS3")

    # E
    og_E_nuc = mt.extract_segment(og_seq, 26245, 26427)
    ref_E_nuc = mt.extract_segment(seq, 26245, 26427)

    og_E = mt.translate(og_E_nuc)
    ref_E = mt.translate(ref_E_nuc)

    E_mutations = mt.get_mutations(og_E, ref_E, 26245, "E")

    # M
    og_M_nuc = mt.extract_segment(og_seq, 26523, 27191)
    ref_M_nuc = mt.extract_segment(seq, 26523, 27191)

    og_M = mt.translate(og_M_nuc)
    ref_M = mt.translate(ref_M_nuc)

    M_mutations = mt.get_mutations(og_M, ref_M, 26523, "M")

    # M
    og_M_nuc = mt.extract_segment(og_seq, 26523, 27191)
    ref_M_nuc = mt.extract_segment(seq, 26523, 27191)

    og_M = mt.translate(og_M_nuc)
    ref_M = mt.translate(ref_M_nuc)

    M_mutations = mt.get_mutations(og_M, ref_M, 26523, "M")

    # NS6
    og_NS6_nuc = mt.extract_segment(og_seq, 27202, 27387)
    ref_NS6_nuc = mt.extract_segment(seq, 27202, 27387)

    og_NS6 = mt.translate(og_NS6_nuc)
    ref_NS6 = mt.translate(ref_NS6_nuc)

    NS6_mutations = mt.get_mutations(og_NS6, ref_NS6, 27202, "NS6")

    # NS7a
    og_NS7a_nuc = mt.extract_segment(og_seq, 27394, 27759)
    ref_NS7a_nuc = mt.extract_segment(seq, 27394, 27759)

    og_NS7a = mt.translate(og_NS7a_nuc)
    ref_NS7a = mt.translate(ref_NS7a_nuc)

    NS7a_mutations = mt.get_mutations(og_NS7a, ref_NS7a, 27394, "NS7a")

    # NS7b
    og_NS7b_nuc = mt.extract_segment(og_seq, 27756, 27887)
    ref_NS7b_nuc = mt.extract_segment(seq, 27756, 27887)

    og_NS7b = mt.translate(og_NS7b_nuc)
    ref_NS7b = mt.translate(ref_NS7b_nuc)

    NS7b_mutations = mt.get_mutations(og_NS7b, ref_NS7b, 27756, "NS7b")

    # NS8
    og_NS8_nuc = mt.extract_segment(og_seq, 27894, 28259)
    ref_NS8_nuc = mt.extract_segment(seq, 27894, 28259)

    og_NS8 = mt.translate(og_NS8_nuc)
    ref_NS8 = mt.translate(ref_NS8_nuc)

    NS8_mutations = mt.get_mutations(og_NS8, ref_NS8, 27894, "NS8")

    # N
    og_N_nuc = mt.extract_segment(og_seq, 28274, 29533)
    ref_N_nuc = mt.extract_segment(seq, 28274, 29533)

    og_N = mt.translate(og_N_nuc)
    ref_N = mt.translate(ref_N_nuc)

    N_mutations = mt.get_mutations(og_N, ref_N, 28274, "N")

    syn_muts["muts_from_og"][name] = {
        "ORF1a": orf1a_mutations,
        "ORF1ab": orf1ab_mutations,
        "S": S_mutations,
        "NS3": NS3_mutations,
        "E": E_mutations,
        "M": M_mutations,
        "NS6": NS6_mutations,
        "NS7a": NS7a_mutations,
        "NS7b": NS7b_mutations,
        "NS8": NS8_mutations,
        "N": N_mutations
    }
    
tp.save_dict(syn_muts, "../data/JSON/corona2020_germany_muts.json")