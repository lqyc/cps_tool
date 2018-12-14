#!/usr/bin/env node
var program = require('commander');
var path = require('path');
// var exec_shell = require('./exec_shell');
var appInfo = require('../package.json');
var colors = require('colors');
var glob = require("glob")   //匹配路径
var fs = require('fs-extra');  //读取文件信息

program
    .version(appInfo.version)
program
    .command('cps')

    // .option("-p, --path <path>", "Enter you html path")

    .action((cmd, options)=> {
        // console.log(cmd);
        // console.log(options);
        try {
            glob("**/*.wxml", options, (er, files)=> {  //文件列表
                // console.log(files);
                console.log('七牛压缩规则----->  '.black.bgYellow,'?imageView2/2/w/210'.green);               
                console.log('阿里云压缩规则--->  '.black.bgYellow,'?x-oss-process=image/resize,w_120'.green);   
                console.log('\n');                              
                files.forEach(async (item,index)=>{
                    // let src = path.join(__dirname, item.replace('bin/',''))   //文件路径
                    var fileDom = await fs.readFile(item, "utf-8")   //文件读取
                    var imgReg = /<image[\s\S]*?(?:>|\/>)/gi;        //匹配所有image标签              
                    var arrImg = fileDom.match(imgReg)
                    // console.log('【所有已成功匹配图片】：'+arrImg);
                    if(arrImg){
                        var flag=false
                        var num=0
                        for (let i = 0; i < arrImg.length; i++) {
                            //正则匹配压缩规则后缀
                            let testA=/\?imageView/.test(arrImg[i])     //七牛压缩规则
                            let testB=/\?x\-oss\-process/.test(arrImg[i])   //阿里云压缩规则
                            let testC=/asset\.yit\.com\/xcx\/icon/.test(arrImg[i])      //本地上传的图片不用加规则
                            if(!testA && !testB && !testC){
                                num++
                                console.log('【未加压缩规则!】：'.red,arrImg[i]);
                                flag = true     
                            }
                        }
                        if(flag){
                            console.log('== FILE IS IN ==>'.black.bgGreen,item.underline.green,'共'.green,num,'处未加规则'.green); 
                            console.log('\n');                            
                        }
                    }
                })
            })
        } catch (err) {
            console.log(err);
        }
    }).on('--help', function () {
        console.log('  Examples:');
    });

program.parse(process.argv);