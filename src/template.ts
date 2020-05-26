import nunjucks from "nunjucks"
import path from "path"
import fs from "fs"
const xmlescape = require('xml-escape')
const strip_tags = require('locutus/php/strings/strip_tags')
enum Explicit {"clean","yes","no"}
interface Owner {
  name: string;
  email: string;
}

export namespace Template{
  
  export interface FeedConfig {
    title: string;
    subtitle: string;
    feedUrl: string;
    homepage:string;
    description: string;
    language: string;
    updatePeriod: string;
    updateFrequency: number;
    logo: string;
    author: string;
    owner: {
      name: string,
      email: string,
    };
    explicit: Explicit;
    copyright: string;
    category: Array<string>;
    lastBuildDate? :string
    posts?: any
  }
  export function generateFeed(context:FeedConfig){

    let env = new nunjucks.Environment();

    env.addFilter('date_to_rfc822', str => (new Date(str)).toUTCString())
    env.addFilter('noControlChars', str => str.replace(/[\x00-\x09\x0B-\x1F\x7F]/g, ''))
    env.addFilter('uriencode', (str:string) => encodeURI(str))
    env.addFilter('xml_escape', (str:string) => {
      if (!str || str === "") return ""
      return xmlescape(str)
    })
    env.addFilter('strip_html', (str:string) => {
      if (!str || str === "") return ""
      return strip_tags(str)
    })
    env.addFilter('get_url',(str:string) => {
      if(str.indexOf("http") == -1) return context.homepage + "/" + str;

      return str;
    })

    let templatePath = path.join(__dirname,"../template/feed.xml")
    let compileTemplate = nunjucks.compile(fs.readFileSync(templatePath,"utf-8"),env);
    context.lastBuildDate = (new Date()).toUTCString()
    return compileTemplate.render(context);
  }
}