// 外部库
import { useEffect, useState } from 'react';

// 内部组件
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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

// 类型定义
type QuestionType = {
    question: string;
    options: string[];
};
export function CreateAvatar() {
    const zodiacSigns = [
        "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座",
        "处女座", "天秤座", "天蝎座", "射手座", "摩羯座",
        "水瓶座", "双鱼座"
    ];

    const occupations = [
        "学生", "IT/互联网", "教育/科研", "医疗/护理", "建筑/房地产",
        "传媒/艺术", "人事/行政", "金融", "财会/审计", "自由职业", "其他"
    ];

    const interests = [
        "音乐", "二次元", "健身", "美食", "摄影", "声控",
        "体育", "steam", "电竞", "电影", "绘画"
    ];

    const [selectedYear, setSelectedYear] = useState<string>('year');
    const [selectedMonth, setSelectedMonth] = useState<string>('month');
    const [selectedDay, setSelectedDay] = useState<string>('day');
    const [selectedZodiac, setSelectedZodiac] = useState<string>('Select Option');
    const [selectedGender, setSelectedGender] = useState<string>('Select Option');
    const [selectedOccupation, setSelectedOccupation] = useState<string>('Select Option');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [answers, setAnswer] = useState<string[]>([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [school, setSchool] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 将所有的状态整合到一个对象中
        const formData = {
            selectedYear,
            selectedMonth,
            selectedDay,
            selectedZodiac,
            selectedGender,
            selectedOccupation,
            selectedInterests,
            answers,
            name,
            age,
            school
        };

        try {
            const response = await fetch('http://localhost:5328/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)  // 提交所有的状态数据
            });

            const data = await response.json();
            console.log(data);

            // 你也可以在这里加入其他的逻辑，例如成功或失败的提示

        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };


    useEffect(() => {
        const mockData = [
            {
                question: "你平时的周末是怎么度过的？",
                options: [
                    "我喜欢和朋友们一起出去聚餐或参加社交活动。",
                    "我喜欢在家里放松，阅读一本好书或者看电影。",
                    "我喜欢尝试新的烹饪食谱，享受烹饪的乐趣。"
                ]
            },
            {
                question: "你对音乐的偏好是什么？",
                options: [
                    "我喜欢各种类型的音乐，从摇滚到古典都能欣赏。",
                    "我主要偏向流行音乐，喜欢跟上时代的音乐潮流。",
                    "我对爵士乐和蓝调音乐情有独钟，喜欢那种放松的感觉。"
                ]
            },
            {
                question: "你最喜欢的电影类型是什么？",
                options: [
                    "我喜欢喜剧电影，因为它可以让我感到轻松愉快。",
                    "我喜欢动作片，因为我觉得它们充满了紧张刺激的情节和场景。",
                    "我喜欢文艺片，因为它们通常具有深刻的内涵和情感，让我感到思考和感悟。"
                ]
            }
        ];
        setQuestions(mockData);
    }, []);
    return (
        <div className="container mx-auto mt-10 p-5 border rounded-xl">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Label>
                        名字:
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </Label>
                    <Separator></Separator>
                    <div className="flex justify-center">
                        <h1 className="mb-2 text-lg font-semibold">
                            选择你的生日
                        </h1>
                    </div>
                    <div className="container flex justify-between">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-1/5">
                                <Badge className="w-full flex justify-center items-center text-white text-xl bg-transparent border border-gray-500 border-opacity-50">
                                    {selectedYear}
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </Badge>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
                                {Array.from({ length: 2023 - 1960 + 1 }).map((_, idx) => (
                                    <DropdownMenuItem key={idx} onSelect={() => setSelectedYear((1960 + idx).toString())}>
                                        {1960 + idx}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-1/5">
                                <Badge className="w-full flex justify-center items-center text-white text-xl bg-transparent border border-gray-500 border-opacity-50">
                                    {selectedMonth}
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </Badge>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
                                {Array.from({ length: 12 }).map((_, idx) => (
                                    <DropdownMenuItem key={idx} onSelect={() => setSelectedMonth((idx + 1).toString())}>
                                        {idx + 1}月
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-1/5">
                                <Badge className="w-full flex justify-center items-center text-white text-xl bg-transparent border border-gray-500 border-opacity-50">
                                    {selectedDay}
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </Badge>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
                                {Array.from({ length: 31 }).map((_, idx) => (
                                    <DropdownMenuItem key={idx} onSelect={() => setSelectedDay((idx + 1).toString())}>
                                        {idx + 1}日
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                    <Separator></Separator>
                    <div className="container flex justify-between">
                        <Label>
                            星座:
                            <DropdownMenu>
                                <DropdownMenuTrigger className="p-2 border border-gray-500 border-opacity-50 rounded-md flex justify-between items-center">
                                    {selectedZodiac}
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
                                    {zodiacSigns.map((zodiac, idx) => (
                                        <DropdownMenuItem key={idx} onSelect={() => setSelectedZodiac(zodiac)}>
                                            {zodiac}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Label>
                        <Label>
                            性别:
                            <DropdownMenu>
                                <DropdownMenuTrigger className="p-2 border border-gray-500 border-opacity-50 rounded-md flex justify-between items-center">
                                    {selectedGender}
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        strokeWidth={2}
                                                                                        d="M19 9l-7 7-7-7"/></svg>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
                                    <DropdownMenuItem onSelect={() => setSelectedGender('男')}>
                                        男
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => setSelectedGender('女')}>
                                        女
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Label>
                        <Label>
                            职业:
                            <DropdownMenu>
                                <DropdownMenuTrigger className="p-2 border border-gray-500 border-opacity-50 rounded-md flex justify-between items-center">
                                    {selectedOccupation}
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        strokeWidth={2}
                                                                                        d="M19 9l-7 7-7-7"/></svg>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
                                    {occupations.map((occupation, idx) => (
                                        <DropdownMenuItem key={idx} onSelect={() => setSelectedOccupation(occupation)}>
                                            {occupation}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </Label>
                    </div>
                    <Separator></Separator>
                    <Label>
                        我的学校:
                        <Input value={school} onChange={(e) => setSchool(e.target.value)} />
                    </Label>
                    <Separator></Separator>
                    <Label>
                        我的兴趣:
                        <div className="flex flex-wrap space-x-2">
                            {selectedInterests.map((interest, idx) => (
                                <Badge key={idx} className="bg-blue-500">
                                    {interest}
                                    <span className="ml-2 cursor-pointer" onClick={() => setSelectedInterests(prev => prev.filter(i => i !== interest))}>
                                x
                            </span>
                                </Badge>
                            ))}
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="mt-2 p-2 border border-gray-500 border-opacity-50 rounded-md flex justify-between items-center">
                                Select Interests
                                {/* ... SVG ... */}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
                                {interests.map((interest, idx) => (
                                    <DropdownMenuItem key={idx} onSelect={() => {
                                        if (!selectedInterests.includes(interest)) {
                                            setSelectedInterests(prev => [...prev, interest]);
                                        }
                                    }}>
                                        {interest}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Label>
                    <Separator></Separator>
                    <Label>
                        灵魂问题:
                        <div className="flex justify-between flex-wrap">
                            {questions.length > 0 && (
                                questions.map((q, qIndex) => (
                                    <div key={qIndex} className="flex flex-col">
                                        {q.question}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="p-2 border border-gray-500 border-opacity-50 rounded-md flex justify-between items-center">
                                                {answers[qIndex] ? answers[qIndex] : 'Select Option'}
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
                                                {q.options.map((option, idx) => (
                                                    <DropdownMenuItem key={idx} onSelect={() => {
                                                        const updatedAnswers = [...answers];
                                                        updatedAnswers[qIndex] = option;
                                                        setAnswer(updatedAnswers);
                                                    }}>
                                                        {option}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                ))
                            )}
                        </div>

                    </Label>
                    <Button type="submit">提交</Button>
                </form>
        </div>
    )
}