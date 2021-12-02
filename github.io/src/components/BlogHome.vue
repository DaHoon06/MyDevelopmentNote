<template>
  <div id="blogHome">
    <section>
      <template>
        <b-container fluid>
          <b-row>

            <b-col cols="8" class="content_area">
              <div id="listgroup-ex" style="position:relative; overflow-y:auto; height:1000px">
                <h4 id="list-item-1">[Node.js] Tutorial - 서버 만들기</h4>
                <p></p>
                <h4 id="list-item-2">Tutorial - 웹서버 연결</h4>
                <p>

                  const http = require('http');
                  const hostname = '127.0.0.1';
                  const port = 3333;

                  http.createServer((req, res) => {
                  res.writeHead(200,{'Content-Type': 'text/plain'});
                  res.end('Hello World With egoing');
                  }).listen(port,hostname,() => {
                  console.log('서버 실행 되었습니다 사용중인 포트 번호 : ' + port);

                  });

                </p>
                <h4 id="list-item-3">index.html 실행</h4>
                <p>
                  위의 코드와 비슷하다.

                  fs 모듈의 경우 파일을 읽기 위한 모듈!

                  const http = require('http');
                  const fs = require('fs');

                  const hostname = '127.0.0.1';
                  const port = 3333;

                  var app = http.createServer((req, res) => {
                  var url = req.url;

                  if(req.url == '/'){
                  url = '/index.html';
                  }
                  if(req.url == '/favicon.ico'){
                  return res.writeHead(404);
                  }

                  res.writeHead(200);
                  res.end(fs.readFileSync(__dirname + url));

                  console.log('서버 실행 되었습니다 사용중인 포트 번호 : ' + port);
                  });

                  console.log("테스트 입니다.");
                  app.listen(port,hostname);

                  index.html은 현재 server.js파일과 동일한 디렉토리 안에 존재한다.

                  ** 서버를 요청받을때 port, hostname 의 순서가 틀리지 않도록 유의...


                  res.writeHead(200,{'Content-Type': 'text/plain'});
                </p>
                <h4 id="list-item-4">실습</h4>
                <p>{{ text }}</p>
              </div>
            </b-col>

            <b-col cols="4" class='category_box'>
              <b-list-group v-b-scrollspy:listgroup-ex>
                <b-list-group-item href="#list-item-1">[Node.js] Tutorial - 서버 만들기</b-list-group-item>
                <b-list-group-item href="#list-item-2">Tutorial - 웹서버 연결</b-list-group-item>
                <b-list-group-item href="#list-item-3">index.html 실행</b-list-group-item>
                <b-list-group-item href="#list-item-4">실습</b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </section>

    <div id="start">
      <template>
        <div>
          <b-form-rating v-model="start"></b-form-rating>
        </div>
      </template>
    </div>


  </div>
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";

@Component
export default class BlogHome extends Vue{

  start: number;
  text: string;

  constructor() {
    super();

    this.start = 0;
    this.text = `
          Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla
          tempor. Laborum consequat non elit enim exercitation cillum aliqua
          consequat id aliqua. Esse ex consectetur mollit voluptate est in duis
          laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam
          Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum
          nisi sit est tempor laborum mollit labore officia laborum excepteur
          commodo non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur
          ipsum commodo tempor sunt in proident.
          Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla
          tempor. Laborum consequat non elit enim exercitation cillum aliqua
          consequat id aliqua. Esse ex consectetur mollit voluptate est in duis
          laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam
          Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum
          nisi sit est tempor laborum mollit labore officia laborum excepteur
          commodo non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur
          ipsum commodo tempor sunt in proident.Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla
          tempor. Laborum consequat non elit enim exercitation cillum aliqua
          consequat id aliqua. Esse ex consectetur mollit voluptate est in duis
          laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam
          Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum
          nisi sit est tempor laborum mollit labore officia laborum excepteur
          commodo non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur
          ipsum commodo tempor sunt in proident.Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla
          tempor. Laborum consequat non elit enim exercitation cillum aliqua
          consequat id aliqua. Esse ex consectetur mollit voluptate est in duis
          laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam
          Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum
          nisi sit est tempor laborum mollit labore officia laborum excepteur
          commodo non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur
          ipsum commodo tempor sunt in proident.Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla
          tempor. Laborum consequat non elit enim exercitation cillum aliqua
          consequat id aliqua. Esse ex consectetur mollit voluptate est in duis
          laboris ad sit ipsum anim Lorem. Incididunt veniam velit elit elit veniam
          Lorem aliqua quis ullamco deserunt sit enim elit aliqua esse irure. Laborum
          nisi sit est tempor laborum mollit labore officia laborum excepteur
          commodo non commodo dolor excepteur commodo. Ipsum fugiat ex est consectetur
          ipsum commodo tempor sunt in proident.
        `;
  }


}

</script>

<style scoped>
#blogHome{
  width: calc(100% - 300px);
  margin-left: 300px;
  min-height: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category_box{
  position: fixed;
  right: 50px;
  top: 200px;
  width: 180px;
}

.content_area{
  margin: auto;
}

#start {
  margin-bottom: 40px;
}


</style>