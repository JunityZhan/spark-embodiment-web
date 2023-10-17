来写一下这里后端的需求。

这里有个index.py, 里面是各种请求的路由，但是要按照已有的格式，前面要加个/python/api

然后submit这里收集了用户的信息，应该是足以生成人格的

需要把这些信息去生成人格（接一下你们是怎么生成人格的程序）

然后还需要一个函数，return更多的灵魂问题，也就是接你们前面说的自己生成灵魂问题

return的格式为
```python
    data = [
        {
            "question": "你平时的周末是怎么度过的？",
            "options": [
                "我喜欢和朋友们一起出去聚餐或参加社交活动。",
                "我喜欢在家里放松，阅读一本好书或者看电影。",
                "我喜欢尝试新的烹饪食谱，享受烹饪的乐趣。"
            ]
        },
        {
            "question": "你对音乐的偏好是什么？",
            "options": [
                "我喜欢各种类型的音乐，从摇滚到古典都能欣赏。",
                "我主要偏向流行音乐，喜欢跟上时代的音乐潮流。",
                "我对爵士乐和蓝调音乐情有独钟，喜欢那种放松的感觉。"
            ]
        },
        {
            "question": "你最喜欢的电影类型是什么？",
            "options": [
                "我喜欢喜剧电影，因为它可以让我感到轻松愉快。",
                "我喜欢动作片，因为我觉得它们充满了紧张刺激的情节和场景。",
                "我喜欢文艺片，因为它们通常具有深刻的内涵和情感，让我感到思考和感悟。"
            ]
        }
    ]
    return jsonify(data)
```
这里的data就自己用ai生成。

然后需要对接chat-haruhi的AI聊天，这里是不是前端提供人格的名字就行了。
如果是的话，就直接写根据提供的名字，用chat haruhi来生成回复。然后return jsonify的结果就行了。