const fs = require('fs');

const readFile = async (fileName = './data.txt') => {
    return new Promise((resolve) => {
        const arr = [];
        const stream = fs.createReadStream(fileName, {encoding: 'utf8'});
        stream.on('data', data => {
            const splittedData = data.split(/\n/);
            const header = splittedData[0];
            const headerSplit = header.split('|');
               
            for (let i = 1; i < splittedData.length; i++ ) {
                const hash = {}
                const bodySplit = splittedData[i].split('|');
                headerSplit.forEach((header, i) => {
                    hash[header] = bodySplit[i]
                })
                arr.push(hash);
            }
            stream.destroy();
        });
        stream.on('close', () => {
            resolve(arr);
        });
    })
}

const writeFileFromArr =  (filename = 'example.out', arr = []) => {
    var file = fs.createWriteStream(filename);
    const headerArr = Object.keys(arr[0]);
    const header = `${headerArr.join('|')}\n`;
    file.write(header);
  
    arr.forEach((arVal, i) => {
        const val = Object.values(arVal);
        file.write(val.join('|') + '\n');
    })
    file.end()
}

const getTotalProperties = (data) => {
    let total = 0;
    Object.keys(data).forEach((d) => {
        if (d.includes('property')) {
            total += 1;
        }
    })
    return total;
}

const sortFunc = (key, sortBy, totalProperties = 0) => {
    return (a , b) => {
        const splittedKeys = key.split('property');
        const propertyKeyIndex = parseInt(splittedKeys[1]);
        if ( propertyKeyIndex < totalProperties - 1) {
            for (let i = propertyKeyIndex; i < totalProperties; i++) {
                if (a[`property${propertyKeyIndex + 1}`] === '$total' && b[`property${propertyKeyIndex + 2}`] === '$total' || a[`property${propertyKeyIndex + 1}`] === '$total') {
                    return -1
                }
                if (b[`property${propertyKeyIndex + 1}`] === '$total' && b[`property${propertyKeyIndex + 2}`] === '$total' || b[`property${propertyKeyIndex + 1}`] === '$total') {
                    return 1
                }
            }
        }
        
        return  parseFloat(b[sortBy]) -  parseFloat(a[sortBy]);
    }
}

async function main (sortBy='net_sales') {
    const arr = await readFile('./data.txt');
    //build the hash with the propertyO as the parent
    const hashArr = {};
    for (var i=0; i<arr.length; i++) {
    if (hashArr[arr[i].property0] == undefined) hashArr[arr[i].property0] = [];
        hashArr[arr[i].property0].push(arr[i]);
    }

    const result = [];
    if (hashArr['$total']) {
        result.push(hashArr['$total']);
        // remove $total key
        delete hashArr['$total'];
    }
    const totalProperties = getTotalProperties(arr[0]);
    const hierarchicalSort = (data, key, res) => {
        // stopping condition
        if (data.length === 0) return;
        // if the sub category, then sort only by parent
        let arr = [];
        const splittedKeys = key.split('property');
        const propertyKeyIndex = parseInt(splittedKeys[1]);
        if (propertyKeyIndex === 0) {
            arr = data.sort(sortFunc(key, sortBy, totalProperties));
            arr.forEach((fData) => {
                // save data that have $total in property1
                if (fData[`property${propertyKeyIndex + 1}`] === '$total') {
                    res.push(fData);
                }
            })
            // filtering new parent data
            data = arr.filter((d) =>  res.findIndex((r) => r === d) === -1)
        } else {
            const temp = data.filter((d) => d[`property${propertyKeyIndex - 1}`] === data[0][`property${propertyKeyIndex - 1}`]);
            arr = temp.sort(sortFunc(key, sortBy, totalProperties));
            // push the data for sub categiory
            if (propertyKeyIndex === totalProperties - 1) {
                arr.forEach((data) => {
                    res.push(data);
                });
            } else {
                data = arr;
            }
        }
        
        // decided what is the next key
        let nextKey ='';
        if (propertyKeyIndex === totalProperties - 1) {
            nextKey = `property${0}`;
        } else {
            nextKey = `property${propertyKeyIndex + 1}`
        }
        hierarchicalSort(data, nextKey, res)
        return res
    }
    
    const sortedHash = {};
    Object.keys(hashArr).forEach((key) => {
      sortedHash[key] = hierarchicalSort(hashArr[key], 'property0', []);
    });

    const sortedKey = Object.keys(sortedHash).sort((a, b) => {
        return sortedHash[b][0][sortBy] - sortedHash[a][0][sortBy]
    })
    sortedKey.forEach((key) => {
        result.push(sortedHash[key]);
    })

    writeFileFromArr('data-out.txt', result.flat())
}

main()