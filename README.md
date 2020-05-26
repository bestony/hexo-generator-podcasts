<img align="center" src="https://postimg.aliavv.com/mbp/eultm.png" />

# hexo-generator-podcasts

The plugin make your hexo can use as a podcast site.

## News
To know new features and bugfixes, please visit [releases](https://github.com/bestony/hexo-generator-podcasts/releases) index.
## Features 

- Multiple Podcast Support
- Custom Podcast Path Support
- Apple Podcast Spec

## Demo 

- Podcast Site: https://productivity.wiki/
- Podcast Feed: https://productivity.wiki/feed/podcast

## Installation
go to the root folder of your hexo blog(contains `\themes`, `index.html`, `\node_modules`, etc.).

unix/linux terminal run

```bash
npm install hexo-generator-podcasts --save
```
## Options
open root _config.yml

add 
### For Single Podcast

```yaml
podcasts:
  name: "podcast"
  path: "feed/podcast"
  title: "生产力维基"
  subtitle: "xxx"
  description: "一个关注时间管理、知识管理、目标管理、项目管理、精力管理和个人效能的播客. 欢迎一同讨论生产力工具的心得！"
  image: "img.jpeg"
  language: "zh-CN"
  category:
    - Technology
    - Business
      - Management & Marketing
    - Technology
      - Tech News
  explicit: "clean"
  author: "白宦成"
  link: https://productivity.wiki/
  owner:
    name: "白宦成"
    email: xiqingongzi@gmail.com
  type: episodic
  copyright: 生产力维基
```

- **name**: podcast name, also **use as podcast category**
- **path**: podcast feed path
- **title**: podcast title
- **subtitle**: podcast subtitle
- **description**: podcast
- **image**: podcast cover image, you can put image under `source` directory and put filename here.
- **language**: podcast language, [ISO-639 style](http://www.loc.gov/standards/iso639-2/php/code_list.php)
- **category**: podcast category.
- **explicit**: suitable for children? default is "clean"
- **author**: podcast author
- **link**: podcast homepage
- **owner**: podcast owner with name & email
- **type**: podcast type, option can be "episodic" or "serial"
- **copyright**: copyright text
### For Multiple Podcast

```

podcasts:
  - name: "podcast"
    path: "feed/podcast"
    title: "生产力维基"
    subtitle: "xxx"
    description: "一个关注时间管理、知识管理、目标管理、项目管理、精力管理和个人效能的播客. 欢迎一同讨论生产力工具的心得！"
    image: "img.jpeg"
    language: "zh-CN"
    category:
      - Technology
      - Business
        - Management & Marketing
      - Technology
        - Tech News
    explicit: "clean"
    author: "白宦成"
    link: https://productivity.wiki/
    owner:
      name: "白宦成"
      email: xiqingongzi@gmail.com
    type: episodic
    copyright: 生产力维基
  - name: "podcast"
    path: "feed/podcast2"
    title: "生产力维基"
    subtitle: "xxx"
    description: "一个关注时间管理、知识管理、目标管理、项目管理、精力管理和个人效能的播客. 欢迎一同讨论生产力工具的心得！"
    image: "img.jpeg"
    language: "zh-CN"
    category:
      - Technology
      - Business
        - Management & Marketing
      - Technology
        - Tech News
    explicit: "clean"
    author: "白宦成"
    link: https://productivity.wiki/
    owner:
      name: "白宦成"
      email: xiqingongzi@gmail.com
    type: episodic
    copyright: 生产力维基
```

## Episode Information

you can create a new episode by run `hexo new episode [title]`, it will have some default metadata in the front-matter of your post.

```
---
title: {{ title }}
date: {{ date }}
tags:
category: podcast
media: /path/to/media # placed under //URL/to/static/resources/path/to/media
image: /path/to/episode/image # same as above, but somehow itunes doesn't support episode image as it should do
length: 6989
type: audio/mpeg
duration: XX:YY:AA
chapter:
  [
    ["00:00:00.000", "Title 1"],
    ["OTHER STARTTIME", "Another title"]
  ]
layout: podcast
---
```
- **title**: episode title
- **date**: episode publish data
- **category**: episode category,  also **use as podcast name in config file**
- **media**: mp3/wav file path, you can put it on your `source`  directory and put filename here.
  for example, if your file name is `episode1.mp3`, this option is `episode1.mp3`
  
```  
├── source
│   ├── _posts
│   ├── about
│   ├── archive
│   └── episode1.mp3
```

- **image**: episode coverimage
- **length**: episode file length, in bytes.
- **type**: file type
- **duration**: episode duration
- **chapter**: episode chapter
- **layout**: default, set as podcast.

## FAQ
**What's this plugin supposed to do?**

This plugin is used for generating a podcast feed file from your Hexo blog.

## Future Works

1. Buildin Music Player.

## LICENSE
[GPL](LICENSE)
