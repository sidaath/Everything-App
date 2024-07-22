'use client'
import { addToInventory } from "@/app/lib/food/mocks";

export default async function GroceryItem(
    {itemName, size, unit, quantity, id}:{itemName:string, size:number, unit:string, quantity:number, id:string}){

    async function handleCheckBox(){
        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('size', size.toString());
        formData.append('unit', unit)
        formData.append('quantity', quantity.toString())
        formData.append('id', id)
        await addToInventory(formData)

    }
    return (
        <form className="flex flex-row">
            <input type="checkbox" onChange={handleCheckBox}/>
            <h1 className="p-2">{itemName}</h1>
            <h2 className="p-2">{size + " "+unit+" x"+quantity}</h2>
        </form>
    )
}