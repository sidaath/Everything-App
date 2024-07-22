'use server'

import { revalidatePath } from "next/cache";
/* GLOBAL Id STUFF*/
let temp = 10;

/* */

/* Mocks for the to buy grocery list*/
const item1 = {itemName:'Item 1', size:3, units:'Nos', quantity:3, id:'1'}
const item2 = {itemName:'Item 2', size:7, units:'Nos', quantity:6, id:'2'}
const item3 = {itemName:'Item 3', size:1, units:'kg', quantity: 2, id:'3'}

let toBuyItemsList = [item1, item2, item3];

export async function addNewItemToBuy(formData: FormData){
    console.log("ruinning addNewItemToBuy")
    const newItem = {
        itemName : formData.get('itemName')?.toString()||'',
        size : Number(formData.get('size')),
        units : formData.get('unit')?.toString() ||'',
        quantity:Number(formData.get('quantity')),
        id: temp.toString()
    }

    temp = temp + 1    
    toBuyItemsList = [...toBuyItemsList, newItem]
    revalidatePath('/food')
}

export async function getToBuyList(){
    console.log("running getToBuyList")
    return toBuyItemsList;
}

async function removeFromToBuy(itemId:string){
    console.log("running removeFromToBuy")
    const index = toBuyItemsList.findIndex(x => x.id===itemId)
    toBuyItemsList.splice(index, 1)
}


/* Mocks for the inventory list*/
const invItem1 = {itemName:'Inv Item 1', size:7, units:'Nos', quantity:12, id:'4', exp:null}
const invItem2 = {itemName:'Inv Item 2', size:14, units:'Nos', quantity:1, id:'5', exp:'2024-10-12'}
const invItem3 = {itemName:'Inv Item 3', size:3, units:'kg', quantity: 98, id:'6', exp:null}

let inventory = [invItem1, invItem2, invItem3]

export async function getInventory(){
    console.log("running getInventory")
    return inventory;
}

export async function addToInventory(formData: FormData){
    console.log("running addToInventory")
    const newInvItem = {
        itemName : formData.get('itemName')?.toString()||'',
        size : Number(formData.get('size')),
        units : formData.get('unit')?.toString() ||'',
        quantity:Number(formData.get('quantity')),
        id : formData.get('id')?.toString()||'',
        exp: formData.get('exp')?.toString()||null
    }
    
    inventory = [...inventory,  newInvItem]
    removeFromToBuy(newInvItem.id)
    revalidatePath('/food')

}

export async function increment(itemId:string){
    console.log("running increment")
    const index = inventory.findIndex(x => x.id===itemId)
    inventory[index].quantity = inventory[index].quantity + 1;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    revalidatePath('/food')
}

export async function decrement(itemId:string){
    console.log("running decrement")
    const index = inventory.findIndex(x => x.id===itemId)
    inventory[index].quantity = inventory[index].quantity - 1;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    revalidatePath('/food')
}