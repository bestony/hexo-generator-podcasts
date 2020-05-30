import fs from "fs"
import path from "path"
import { Template } from "./template"
function generat_podcast_feed(podcastsConfig:any,locals:any){
  const categories = locals.categories
  /**
   * make url access
   */
  if (podcastsConfig.path[podcastsConfig.path.length - 1] !== '/') podcastsConfig.path += '/'
  
  const podcast_category = categories.findOne({name: podcastsConfig.name})
  const posts = podcast_category ? podcast_category.posts.sort('date', -1).data : []
  /**
   * 切分 Category
   */
  const podcastItunesCategory = podcastsConfig.category.map((item:string) => {
    let data = item.split(" - ");
    return {
      top: data[0],
      sub: data[1]?data[1]:''
    }
  })

  let FeedConfig  = {
    title : podcastsConfig.title,
    subtitle: podcastsConfig.subtitle,
    feedUrl: hexo.config.url + "/" + podcastsConfig.path,
    homepage: hexo.config.url ,
    description: podcastsConfig.description,
    logo:podcastsConfig.image,
    language: podcastsConfig.language,
    author: podcastsConfig.author,
    explicit: podcastsConfig.explicit,
    copyright: podcastsConfig.copyright,
    updatePeriod:"hourly",
    updateFrequency:1,
    type: podcastsConfig.type,
    owner: podcastsConfig.owner,
    category: podcastItunesCategory,
    posts: posts
  }
  return {
    path:podcastsConfig.path,
    data:Template.generateFeed(FeedConfig)
  }
}

hexo.extend.generator.register('podcasts', function (locals: Object) {
  const podcastsConfig = hexo.config.podcasts;
  /**
   * 如果没有设置，直接退出
   */
  if(!podcastsConfig) return [];
  
  /**
   * 生成 scaffold
   */
  hexo.scaffold.get("episode").then(item => {
    if(!item){
      let templateContent = fs.readFileSync(path.join(__dirname,"../template/episode.md"),"utf-8");
      hexo.scaffold.set("episode",templateContent)
    }
  })

  /**
   * 如果是数组，对数组进行循环
   */
  if(podcastsConfig instanceof Array){
    let responseArray:any = [];
    podcastsConfig.forEach(item => {
      responseArray.push(generat_podcast_feed(item,locals))
    })
    return responseArray;
  }
  /**
   * 如果是对象，则直接生成并返回
   */
  if(podcastsConfig instanceof Object){
    return generat_podcast_feed(podcastsConfig,locals);
  }
});