function printReceipt(barcodes) {
    const formattedCode=formatBarcode(barcodes);
    const fullInfo=getFullInfo(formattedCode);
    const printResult=printFormattedReceipt(fullInfo);
    console.log(printResult)
}
function formatBarcode(barcodes){
    const formattedBarcodes=countBarcodes(barcodes);
    return formattedBarcodes;
}
function countBarcodes(barcodes){
    let formattedBarcodes=[];
    const removeDuplicatesBarcodes=removeDuplicates(barcodes);
    for(let rBarcode of removeDuplicatesBarcodes){
        let count=0;
        for(let barcode of barcodes){
            if(rBarcode===barcode){
                count++;
            }
        }
        formattedBarcodes.push({'barcode':rBarcode,'quantity':count});
    }
    return formattedBarcodes;
}

function removeDuplicates(formattedBarcodes){
    return Array.from(new Set(formattedBarcodes));
}
function getFullInfo(formattedCode){
    const datas=[
        {
            barcode: 'ITEM000000',
            name: 'Coca-Cola',
            price: 3
        },
        {
            barcode: 'ITEM000001',
            name: 'Sprite',
            price: 3
        },
        {
            barcode: 'ITEM000002',
            name: 'Apple',
            price: 5
        },
        {
            barcode: 'ITEM000003',
            name: 'Litchi',
            price: 15
        },
        {
            barcode: 'ITEM000004',
            name: 'Battery',
            price: 2
        },
        {
            barcode: 'ITEM000005',
            name: 'Instant Noodles',
            price: 4
        }
    ];
    for(let info of formattedCode){
        for(let data of datas){
            if(data.barcode===info.barcode){
                info.name=data.name;
                info.price=data.price;
                info.subtotal=info.price*info.quantity;
            }
        }
    }
    return formattedCode;
}
function printFormattedReceipt(fullInfo){
    const headMessage=`
***<store earning no money>Receipt ***
`;
    const lineA='----------------------\n';
    const  lineB='**********************';
    let  receipt='';
    let total=0;
    for(let info of fullInfo){
        total+=info.subtotal;
        receipt+='Name: '+info.name+', Quantity: '+info.quantity+', Unit price: '+info.price+' (yuan), Subtotal: '+info.subtotal+' (yuan)\n';
    }


    console.log(headMessage +receipt+lineA
        +'Total: '+total+' (yuan)\n'
        +lineB
    );
}
module.exports = {
    printReceipt
};