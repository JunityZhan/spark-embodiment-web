import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator
} from '@/components/ui/select';

import { useState } from 'react';
export function CreateAvatar() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5328/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age, height })
        });

        const data = await response.json();
        console.log(data);
    };
    return (
        <div className="container mx-auto mt-10 p-5 border rounded">
                <div>
                    <form onSubmit={handleSubmit}>
                        <Label>
                            名字:
                            <Input value={name} onChange={(e) => setName(e.target.value)} />
                        </Label>

                        <br />
                        <Label className="whitespace-nowrap mr-3">
                            年龄:
                            <Input value={age} onChange={(e) => setAge(e.target.value)} />
                        </Label>
                        <br />
                        <Label className="whitespace-nowrap mr-3">
                            身高:
                            <Input value={height} onChange={(e) => setHeight(e.target.value)} />
                        </Label>
                        <br />
                        <Select>
                            <SelectTrigger>选择一个选项</SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>分组 1</SelectLabel>
                                    <SelectItem value="option1">选项 1</SelectItem>
                                    <SelectItem value="option2">选项 2</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button type="submit">提交</Button>

                    </form>
                </div>



        </div>
    )
}