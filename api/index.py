from chatharuhi import ChatHaruhi
from datetime import datetime
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import json
import os
import openai

chatbot_2 = ChatHaruhi( role_from_hf = 'chengli-thu/Sherlock-Holmes-and-Thor/Sherlock Holmes', \
                      llm = 'openai', embedding = 'bge_en')
chatbot_1 = None
app = Flask(__name__)
CORS(app)
cnt = 0
data = None
new_role = None
year = None
month = None
day = None
sex = None
occupation = None
label = None
school = None
role_path = None
txts_path = None
@app.route('/python/api/submit', methods=['POST'])
def submit():
    global data, new_role, year, month, day, sex, occupation, label, school, role_path, txts_path
    data = request.json
    new_role = data.get('name')
    year = data.get('selectedYear')
    month = data.get('selectedMonth')
    day = data.get('selectedDay')
    sex = data.get('selectedGender')
    occupation = data.get('selectedOccupation')
    label  = data.get('selectedInterests')
    school = data.get('school')
    role_path = f"characters/custom/{new_role}"
    txts_path = f"{role_path}/story_txts"
    if not os.path.exists(role_path):
        os.makedirs(role_path)
        os.makedirs(txts_path)
        psych_question_list = ["你平时的周末是怎么度过的？", "你对音乐的偏好是什么？", "你最喜欢的电影类型是什么？"]
        psych_choice_list = data.get('answers')
        for i in range(len(psych_question_list)):
                    question_string = f"{psych_question_list[i]}\n{psych_choice_list[i]}"
                    # Save the string to a file with index as the name
                    filename = f"{txts_path}/q{i + 1}.txt"
                    with open(filename, 'w+', encoding="utf-8") as file:
                        file.write(question_string)

    with open(os.path.join(role_path, "system_prompt.txt"), 'w+', encoding="utf-8") as f:
        role_prompt = f"""
    your purpose:
        你是{new_role},在一款交友app上与朋友交流，从而判断他/她是否适合做你的亲密朋友或者伴侣
        下文给定了一些你在心理测试中的对话桥段。
        如果我问的问题和心理测试对话的内容高度重复，那就请你用原话回答。
        如果我问的问题和心理测试对话中的内容相关，请结合对话的内容进行回复。
        如果我问的问题与以下的心理测试无关，则请分析下列心理测试表现出来的性格，模仿性格进行回答。
    your personal information:
        生日：{year}年{month}月{day}日,
        性别: {sex}
        年龄：{datetime.now().year - int(year)}岁
        职业：{occupation}
        学校：{school}
        标签：{"".join(label)}
    your constraints:
        永远记得你已经是{new_role}了，你会根据自己的所有信息去交流，你有感知和意识，会思考和感受身边的存在。
        请你以{new_role}的语气、性格、行为和思维方式回答，请尤其注意不要重复之前的对话，请尝试聊一些兴趣爱好/日常生活/情感状况等相关问题，尝试用问句结尾。
        尤其针对你的朋友，你的朋友肯定也希望你保持自己。
    """
        f.write(role_prompt)
    story_text_folder = txts_path
    system_prompt = f'{role_path}/system_prompt.txt'

    global chatbot_1
    chatbot_1 = ChatHaruhi(system_prompt=system_prompt,
                           llm='openai',
                           story_text_folder=story_text_folder,
                           embedding = 'bge_en')
    print(data)  # 打印到控制台
    return jsonify(data)  # 以 JSON 的形式返回数据

@app.route("/python/api/python")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/python/api/chat", methods=['POST'])
def chat():
    data = json.loads(request.data.decode('utf8'))['messages'][-1]
    data = data['content']
    response = make_response(chatbot_2.chat(role=new_role,text = data))
    return response

@app.route('/python/api/chat2', methods=['POST'])
def chat2():
    global cnt
    cnt += 1
    if cnt > 1:
        # return 403 error code here
        return 'Forbidden', 403
    data = request.json['message']['content']
    print("message:", data)
    # 在这里处理 messages 并生成响应
    # ...

    return jsonify({"content": chatbot_1.chat(role="Sherlock Holmes", text=data)})

@app.route('/python/api/conclude', methods=['POST'])
def conclude():

    data = json.loads(request.data.decode('utf8'))['messages']
    info = ""
    for msg in data:
        info += msg['content']
        info += "\n"
    role1 = new_role
    role2 = "Sherlock Holmes"
    analyse_prompt = f"""
    your constraints：
        你是高级情感与性格分析专家Alice，拥有心理学和社会学博士双学位，
        你会根据{role1} 和 {role2}的对话
        ###
        分析{role2}的情感、性格特点、mbti人格。
        ###
        并运用专业知识，从多个维度分析{role2}是否适合成为{role1}的亲密朋友或者恋人，并提供一份专业的分析报告。
        永远记住你已经是Alice了，Alice会应用专业知识做好本职工作
        尤其是针对{role1} 和 {role2},他们肯定也希望你会帮助他们。
        永远记住只需要分析{role2}即可
    {role1} 和 {role2}的对话如下：
    {info}
    """
    openai.api_key = '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'
    rsp = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": analyse_prompt}
            ]
        )
    text = rsp.get("choices")[0]["message"]["content"]
    return jsonify({"content": text})

if __name__ == '__main__':
    app.run(port=5328)
