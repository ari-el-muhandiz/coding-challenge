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
    
    const sortFunc = (key) => {
        return (a , b) => {
            if (key === 'property0') {
                if ((a.property1 === '$total' && a.property2 === '$total') || a.property1 === '$total') {
                    return -1;
                }   
                if ((b.property1 === '$total' && b.property2 === '$total') || b.property1 === '$total') {
                    return 1;
                }
            }
            if (key === 'property1') {
                if (b.property2 === '$total') {
                    return 1;
                }
                if (a.property2 === '$total') {
                    return -1;
                }
            }
            return  parseFloat(b[sortBy]) -  parseFloat(a[sortBy]);
        }
    }
    const hierarchicalSort = (data, key, res) => {
        // stopping condition
        if (data.length === 0) return;
        // if the sub category, then sort only by parent
        let arr = [];
        if (key === 'property0') {
            arr = data.sort(sortFunc(key));
            arr.forEach((fData) => {
                // save data that have $total in property1
                if (fData.property1 === '$total') {
                    res.push(fData);
                }
            })
            // filtering new parent data
            data = arr.filter((d) =>  res.findIndex((r) => r === d) === -1)
        } 
        if (key === 'property1') {
            const temp = data.filter((d) => d.property0 === data[0].property0);
            arr = temp.sort(sortFunc(key));
            // getting all data that has same parent of property0
            data = arr;
        }
        if (key === 'property2') {
            const temp = data.filter((d) => d.property1 === data[0].property1);
            arr = temp.sort(sortFunc(key));
            // push the data for sub categiory
            arr.forEach((data) => {
                res.push(data);
            });
        }
        
        // decided what is the next key
        let nextKey ='';
        if (key === 'property0') {
            nextKey = 'property1'
        } else if (key === 'property1') {
            nextKey = 'property2'
        } else {
            nextKey = 'property0'
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