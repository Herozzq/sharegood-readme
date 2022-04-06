#!/usr/bin/env node
const fs = require('fs')

//项目介绍
let projectIntroduction = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('README.md', (err, data) => {
            if (err) {
                console.log('读取README失败，请检查文档')
            } else {
                let text = data.toString()
                let technologyValue = text.split('技术选型:')[1] && text.split('技术选型:')[1].split('\n')[0] || ''
                let developmentValue = text.split('开发方式:')[1] && text.split('开发方式:')[1].split('\n')[0] || ''
                let accessValue = text.split('访问方式:')[1] && text.split('访问方式:')[1].split('\n')[0] || ''
                let typeValue = text.split('产品类型:')[1] && text.split('产品类型:')[1].split('\n')[0] || ''

                let technology = '\n- 技术选型:' + technologyValue
                let development = '\n- 开发方式:' + developmentValue
                let access = '\n- 访问方式:' + accessValue
                let type = '\n- 产品类型:' + typeValue
               
                let nameValue = text.split('## 项目介绍-')[1] && text.split('## 项目介绍-')[1].split('\n')[0] || ''
                let projectName = ''
                if(nameValue){
                    projectName = nameValue
                }else{
                    projectName = '项目全称'
                }
                let result = `## 项目介绍-${projectName} \n\n### 概要` + technology + development + access + type
                resolve(result)
            }
        })

    })
}

//模块
let viewModule = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('README.md', (err, data) => {
            if (err) {
                console.log('读取README失败，请检查文档')
            } else {
                let text = data.toString()
                let instructionValue = text.split('### 模块')[1] && text.split('### 模块\n')[1].split('\n\n### 补充说明')[0] || ''
                if (instructionValue == '') {
                    instructionValue = `* 一级模块(名称根据实际需求修改)\n - 二级模块(名称根据实际需求修改)\n - 二级模块(名称根据实际需求修改)`
                }
                let result = '\n\n### 模块\n' + instructionValue
                resolve(result)
            }
        })

    })
}

//补充说明
let supplement = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('README.md', (err, data) => {
            if (err) {
                console.log('读取README失败，请检查文档')
            } else {
                let text = data.toString()
                let instructionValue = text.split('### 补充说明')[1] && text.split('### 补充说明\n')[1].split('\n\n## 环境依赖')[0] || ''
                let result = '\n\n### 补充说明\n' + instructionValue
                resolve(result)
            }
        })

    })
}

//环境依赖
let environmentalDependence = () => {
    return new Promise((resolve, reject) => {
        try {
            let text = fs.readFileSync('package.json').toString()
            let vue = text.split('"vue":')[1].split('\n')[0] || ''
            let router = text.split('"vue-router"')[1].split('\n')[0] || ''
            let ui = text.split('"element-ui":')[1].split('\n')[0] || ''
            let vuex = text.split('"vuex":')[1].split('\n')[0] || ''
            let sharegoodUi = text.split('"sharegood-cloud-utils":')[1].split('\n')[0] || ''
    
            let readmeText = fs.readFileSync('README.md').toString()
            let result = ''
            let environmentalValue = readmeText.split('## 环境依赖 \n')[1] && readmeText.split('## 环境依赖 \n')[1].split('\n\n### 环境配置')[0] || ''
            
            if(environmentalValue){
                result = `\n\n## 环境依赖 \n` + environmentalValue
            }else{
                result = `\n\n## 环境依赖 \n|  名称  |  版本  |  备注  | \n| --- |--- |--- | \n| vue | v${vue} |  |` + `\n| vue-router | v${router} |  |`
                + `\n| element-ui | v${ui} |  |` + `\n| vuex | v${vuex} |  |`
                + `\n| sharegood-ui | v${sharegoodUi} | 基于element-ui封装的组件库 [文档](http://sharegood-element-ui.fat1.icinfo.co/#/zh-CN/component/README) |`
            }
            console.log('依赖',result)
            resolve(result)
        } catch (error) {
            console.log('环境依赖更新失败，请确保在sharegood项目里使用')
        }
       
    })
}


//接口域名
let fat = () => {
    return new Promise((resolve, reject) => {
        let contents = fs.readdirSync('./')
        let fileName = ''
        if (contents.includes('.env.fat')) {
            fileName = '.env.fat'
        } else if (contents.includes('.env.dev')) {
            fileName = '.env.dev'
        } else {
            console.log('未找到开发环境的配置文件,开发环境配置文件名字请以.env.fat或.env.dev或.env.development命名')
            return
        }
        fs.readFile(fileName, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                let text = data.toString()
                let value = text.split('VUE_APP_BASEURL_API =')[1].split('\n')[0]
                let result = '\n\n### 环境配置 \n\n开发环境接口:' + value
                resolve(result)
            }
        })
    })
}

let uat = () => {
    return new Promise((resolve, reject) => {
        let contents = fs.readdirSync('./')
        let fileName = ''
        if (contents.includes('.env.uat')) {
            fileName = '.env.uat'
        } else if (contents.includes('.env.test')) {
            fileName = '.env.test'
        } else {
            console.log('未找到测试环境的配置文件,开发环境配置文件名字请以.env.uat或.env.test命名')
            return
        }
        fs.readFile(fileName, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                let text = data.toString()
                let value = text.split('VUE_APP_BASEURL_API =')[1].split('\n')[0]
                let result = '\n测试环境接口:' + value
                resolve(result)
            }
        })
    })
}

let production = () => {
    return new Promise((resolve, reject) => {
        let contents = fs.readdirSync('./')
        let fileName = ''
        if (contents.includes('.env.production')) {
            fileName = '.env.production'
        } else if (contents.includes('.env.prd')) {
            fileName = '.env.prd'
        } else {
            console.log('未找到测试环境的配置文件,开发环境配置文件名字请以.env.production或..env.prd命名')
            return
        }
        fs.readFile(fileName, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                let text = data.toString()
                let value = text.split('VUE_APP_BASEURL_API =')[1].split('\n')[0]
                let result = '\n生产环境接口:' + value
                resolve(result)
            }
        })
    })
}

//开发上手
let gettingStarted = () => {
    return new Promise((resolve, reject) => {
        let title = '\n\n## 开发上手 \n### web\n```bash\n'

        fs.readFile('package.json', (err, data) => {
            if (err) {
                console.log('读取package.json文件失败，请检查项目')
            } else {
                let text = data.toString()
                let fatValue = ''
                let uatValue = ''
                let name = ''
                if (text.split('build:fat')[1]) {
                    name = text.split('build:fat:')[1] && text.split('build:fat:')[1].split(',')[0].split('":')[0]
                    fatValue = 'npm run build:fat:' + name

                } else if (text.split('build:dev')[1]) {
                    let name = text.split('build:dev:')[1] && text.split('build:dev:')[1].split(',')[0].split('":')[0]
                    fatValue = 'npm run build:dev:' + name
                } else {
                    console.log('未找到开发环境打包命令,请以npm run build:fat:项目名 或 npm run build:dev:项目名 定义')
                }

                if (text.split('build:uat')[1]) {
                    let name = text.split('build:uat:')[1] && text.split('build:uat:')[1].split(',')[0].split('":')[0]
                    uatValue = 'npm run build:uat:' + name
                } else if (text.split('build:test')[1]) {
                    let name = text.split('build:test:')[1] && text.split('build:test:')[1].split(',')[0].split('":')[0]
                    uatValue = 'npm run build:test:' + name
                } else {
                    console.log('未找到测试环境打包命令,请以npm run build:uat:项目名 或 npm run build:test:项目名 定义')
                }

                let start = '\n# 启动服务 \n npm run dev:' + name
                let create = '\n# 新建业务 \n npm run new'
                let buildFat = '\n# 构建开发环境 \n ' + fatValue
                let buildUat = '\n# 构建测试环境 \n ' + uatValue
                let buildPrd = '\n# 构建生产环境 \n npm run build:prd:' + name + '\n```'
                //环境依赖
                let result = title + start + create + buildFat + buildUat + buildPrd
                resolve(result)
            }
        })
    })
}

//代码提交
let commitCode = () => {
    return new Promise((resolve, reject) => {
        let title = '\n\n## 代码提交 \n### commit 格式\n\n格式 `type: subject`\n\n比如 feat: 新增登录模块\n\n```javascript\n;\n'
        let docs = "\40\40'docs', // Adds or alters documentation. 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等\n"
        let chore = "\40\40'chore', // Other changes that don't modify src or test files. 改变构建流程、或者增加依赖库、工具等\n"
        let feat = "\40\40'feat', // Adds a new feature. 新增feature\n"
        let fix = "\40\40'fix', // Solves a bug. 修复bug\n"
        let merge = "\40\40'merge', // Merge branch ? of ?.\n"
        let perf = "\40\40'perf', // Improves performance. 优化相关，比如提升性能、体验\n"
        let refactor = "\40\40'refactor', // Rewrites code without feature, performance or bug changes. 代码重构，没有加新功能或者修复bug\n"
        let revert = "\40\40'revert', // Reverts a previous commit. 回滚到上一个版本\n"
        let style = "\40\40'style', // Improves formatting, white-space. 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑\n"
        let test = "\40\40'test', // Adds or modifies tests. 测试用例，包括单元测试、集成测试等\n"

        let result = title + "[\n" + docs + chore + feat + fix + merge + perf + refactor + revert + style + test + "\n]\n```"

        resolve(result)
    })
}


//工程目录
let directory = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('README.md', (err, data) => {
            if (err) {
                console.log('读取README失败，请检查文档')
            } else {
                let text = data.toString()
                let meauValue = text.split('## 工程目录')[1] && text.split('## 工程目录\n\n```')[1].split('\n```')[0] || ''
                let content = ''
                if (meauValue) {
                    content = meauValue
                } else {
                    content = `
        |-- .env.development ------------ dev 环境变量
        |-- .env.development.local ------ dev 本地环境变量 (被 git 忽略，需手动新建，用来重写部分环境变量)
        |-- .env.fat-项目名 ------------- 开发 环境变量
        |-- .env.uat-项目名 ------------- 测试 环境变量
        |-- .env.production-项目名 ------------- 线上 环境变量
        |-- .vscode --------------------- 统一 VSCode 插件及配置
        |-- public
        |   |-- favicon.ico
        |   |-- index.html
        |-- src
            |-- main.js ------------- 入门文件
            |-- App.vue
            |-- styles
            |   |-- global.less
            |-- router ------------- 路由文件
            |   |-- index.js
            |   |-- routes.js
            |   |-- registerInterceptor.js
            |-- store ------------- 状态管理
            |   |-- index.js
            |   |-- root.js
            |   |-- xxx.js
            |-- api  ------------- 接口地址
            |   |-- xxx.js
            |-- views ------------- 页面模块
        `
                }

                let title = '\n\n## 工程目录\n\n```'
                let end = '\n```'
                let result = title + content + end
                resolve(result)
            }
        })

    })
}


//发布部署
let deploy = () => {
    return new Promise((resolve, reject) => {
        let title = `\n\n## 发布部署 \n|   环境   | 分支  |  访问地址  |  构建命令  |  发布部署  | 备注  |\n| --- |--- |--- |--- |--- |--- |\n`
        fs.readFile('README.md', (err, data) => {
            if (err) {
                console.log('读取README失败，请检查文档')
            } else {
                let text = data.toString()
                let devValue = text.split('| 开发环境 |')[1] && text.split('| 开发环境 |')[1].split('\n')[0] || ''
                let testValue = text.split('| 测试环境 |')[1] && text.split('| 测试环境 |')[1].split('\n')[0] || ''
                let prdValue = text.split('| 生产环境 |')[1] && text.split('| 生产环境 |')[1].split('\n')[0] || ''

                let dev = `| 开发环境 |${devValue}\n`
                let test = `| 测试环境 |${testValue}\n`
                let prd = `| 生产环境 |${prdValue}\n`

                let result = title + dev + test + prd
                resolve(result)
            }
        })
    })
}


//运维配置文件
let maintenance = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('.env.production', (err, data) => {
            if (err) {
                console.log('读取env.production文件失败，请检查配置')
            } else {
                let title = '\n\n### 运维 \n**配置文件.env.production**\n```\n'
                let text = data.toString()
                let NODE_ENV = text.split('NODE_ENV =')[1].split('\n')[0] || ''
                let VUE_APP_ENV = text.split('VUE_APP_ENV =')[1].split('\n')[0] || ''
                let VUE_APP_GZIP = text.split('VUE_APP_GZIP =')[1].split('\n')[0] || ''
                let BASE_URL = text.split('BASE_URL =')[1].split('\n')[0] || ''
                let outputDir = text.split('outputDir =')[1].split('\n')[0] || ''
                let value = text.split('VUE_APP_BASEURL_API =')[1].split('\n')[0] || ''
                let result = title + 'NODE_ENV = ' + NODE_ENV + '\nVUE_APP_ENV = ' + VUE_APP_ENV + '\nVUE_APP_GZIP = ' + VUE_APP_GZIP +
                    '\nVUE_APP_BASEURL_API = ' + value + '\nBASE_URL = ' + BASE_URL + '\noutputDir = ' + outputDir + '\n```'

                resolve(result)
            }
        })
    })
}

//运维打包
let package = () => {
    return new Promise((resolve, reject) => {
        let title = '\n\n**打包**\n```\n'
        let prd = `# 生产环境：master分支\n`
        let git = `# git仓库地址：`
        let install = `\n# 依赖安装\n npm install\n`
        let build = '# 生产打包\n npm run build:prd\n```'
        let result = title + prd + git + install + build
        resolve(result)
    })
}

//nginx配置
let nginx = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('README.md', (err, data) => {
            if (err) {
                console.log('读取README失败，请检查文档')
            } else {
                let text = data.toString()
                let nginxValue = text.split('**nginx**\n\n```')[1] && text.split('**nginx**\n\n```')[1].split('\n```')[0] || ''
                let result = '\n\n**nginx**\n\n```' + nginxValue + '\n```'
                resolve(result)
            }
        })
    })
}

//更多资料
let more = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('README.md', (err, data) => {
            if (err) {
                console.log('读取README失败，请检查文档')
            } else {
                let text = data.toString()
                let interfaceValue = text.split('[接口文档]')[1] && text.split('[接口文档](')[1].split(')\n')[0] || ''
                let productValue = text.split('[产品原型]')[1] && text.split('[产品原型](')[1].split(')\n')[0] || ''
                let uiValue = text.split('[UI地址]')[1] && text.split('[UI地址](')[1].split(')\n')[0] || ''

                let title = '\n\n## 更多资料\n\n### 文档'
                let interface = `\n- [接口文档](${interfaceValue})\n`
                let product = `\n- [产品原型](${productValue})\n`
                let ui = `\n- [UI地址](${uiValue})\n`

                let result = title + interface + product + ui
                resolve(result)
            }
        })
    })
}


let prople = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('README.md', (err, data) => {
            if (err) {
                console.log('读取README失败，请检查文档')
            } else {
                let text = data.toString()
                let frontValue = text.split('前端：')[1] && text.split('前端：')[1].split('\n')[0] || ''
                let rearValue = text.split('后端：')[1] && text.split('后端：')[1].split('\n')[0] || ''
                let productValue = text.split('产品：')[1] && text.split('产品：')[1].split('\n')[0] || ''
                let uiValue = text.split('设计：')[1] && text.split('设计：')[1].split('\n')[0] || ''
                let deliverValue = text.split('交付经理：')[1] && text.split('交付经理：')[1].split('\n')[0] || ''

                let title = '\n\n### 作者列表'
                let front = '\n- 前端：' + frontValue
                let rear = '\n- 后端：' + rearValue
                let product = '\n- 产品：' + productValue
                let ui = '\n- 设计：' + uiValue
                let deliver = '\n- 交付经理：' + deliverValue
                let result = title + front + rear + product + ui + deliver
                resolve(result)

            }
        })
    })
}

let p1 = projectIntroduction()
let p2 = viewModule()
let p3 = supplement()
let p4 = environmentalDependence()
let p5 = fat()
let p6 = uat()
let p7 = production()
let p8 = gettingStarted()
let p9 = commitCode()
let p10 = directory()
let p11 = deploy()
let p12 = maintenance()
let p13 = package()
let p14 = nginx()
let p15 = more()
let p16 = prople()
const task = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16]

Promise.all(task).then((result) => {
    fs.writeFile('README.md', result.join(' '), (error) => {
        if (error) {
            console.log(error);
            return false;
        }
        console.log('文档更新成功')
    })
}).catch((error) => {
    console.log('更新失败，请检查项目配置')
})