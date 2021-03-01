def dfs(refs, dollars, current, index, variants, varianId, results):
    if dollars == 0:
        results.append(list(current))
        return
    if dollars < 0 or varianId >= len(variants):
        return
    data = refs[variants[varianId]]
    for i in range(index, len(data)):
        if data[i] != data[i-1] or i  == index:
            current.append(data[i])
            dfs(refs, dollars - data[i], current, index + 1 if varianId == len(variants) else index, variants, varianId + 1, results)
            current.pop()

def getNumberOfOptions(priceOfJeans, priceOfShoes, priceOfSkirts, priceOfTops, dollars):
    results = []
    refs = {
        'jeans': priceOfJeans,
        'shoes': priceOfShoes,
        'skirts': priceOfSkirts,
        'tops': priceOfTops
    }
    variants = ['jeans', 'shoes', 'skirts', 'tops']
    dfs(refs, dollars, [], 0, variants, 0, results)
    print(results)
    return len(results)

print(getNumberOfOptions([1,2], [4], [1,2], [2,3], 10))
print(getNumberOfOptions([1,2], [4, 1], [1,2, 3], [2,3], 10))


# 1, 4, 2, 3
# 2, 4, 1, 3
# 2, 4, 2, 2