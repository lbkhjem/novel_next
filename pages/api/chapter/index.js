import NextCors from "nextjs-cors";

var express = require("express");
var router = express.Router();
const request = require("request-promise");
const cheerio = require("cheerio");
var cookieParser = require("cookie-parser");

const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  var novel = {};
  var idnovels = req.query.novelid;
  var idchapter = req.query.chapterid;
  const URL = "https://bestlightnovel.com/";

  const getPageContent = (uri) => {
    const options = {
      uri,
      headers: {
        "User-Agent": "Request-Promise",
      },
      transform: (body) => {
        return cheerio.load(body);
      },
    };

    return request(options);
  };
  var data = [];
  var novelsname = null;
  var author = null;
  var genresdata = [];
  var chapterlist = [];
  var dateupdate = null;
  var othername = null;
  var lasterchapter = null;
  var idnovel = null;
  var cover = null;
  var lastupdates = [];
  var update_time = null;
  var id = null;
  var totalpages = null;
  getPageContent(URL + idnovels + "/" + idchapter).then(($) => {
   let chaptername = $(".name_chapter").text();
    console.log(chaptername);
  let  content = $(".vung_doc").html()
  const titles = $('div.lem_bem_top h2 a').text().trim();

  const prevChapterLink = $('.menu_doc a:contains("PREV CHAPTER")').attr('href');
  const nextChapterLink = $('.menu_doc a:contains("NEXT CHAPTER")').attr('href');
  const prevChapterId = prevChapterLink ? prevChapterLink.split('/').pop() : null;
  const nextChapterId = nextChapterLink ? nextChapterLink.split('/').pop() : null;
  let  novel = {
      idnovels: idnovels,
      idchapter: idchapter,
      title:titles,
      chaptername: chaptername,
      content: content,
      prevChapterId:prevChapterId,
      nextChapterId: nextChapterId
    };
    try {
      res.status(200).json(novel);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  });
};

export default handler;
