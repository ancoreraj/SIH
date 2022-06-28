const axios = require('axios')
const cheerio = require('cheerio')

const getPublicJobs = async () => {
    try {
        const url = `https://www.freejobalert.com/latest-notifications/`
        const response = await axios.get(url)
        if (response.status != 200) {
            return "Error"
        }
        const html = response.data
        const $ = cheerio.load(html)

        const data = [];

        const check = ({postDate, recruitmentBoard, postName, qualification, lastDate, applyLink}) => {
            if(!postDate && !recruitmentBoard && !postName && !qualification && !lastDate && !applyLink){
                return false
            }
            return true;
        }

        $('.lattrbord').each((i, el) => {
            const postDate = $(el).find('.latcpb').text().replace(/\s\s+/g, '')
            const recruitmentBoard = $(el).find('.latcr').text().replace(/\s\s+/g, '')
            const postName = $(el).find('.latceb').text().replace(/\s\s+/g, '')
            const qualification = $(el).find('.latcqb').text().replace(/\s\s+/g, '')
            const lastDate = $(el).find('.latclb').text().replace(/\s\s+/g, '')
            const applyLink = $(el).find('a').attr('href')

            const job = {
                postDate,
                recruitmentBoard,
                postName,
                qualification,
                lastDate,
                applyLink
            }

            if(check(job)){
                data.push(job)
            }

        })

        return data

    } catch (err) {
        return err
    }
}

module.exports = getPublicJobs