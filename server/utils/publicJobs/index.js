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

        const check = ({createdAt, organizationName, title, qualification, lastDate, applyLink}) => {
            if(!createdAt && !organizationName && !title && !qualification && !lastDate && !applyLink){
                return false
            }
            return true;
        }

        $('.lattrbord').each((i, el) => {
            const createdAt = $(el).find('.latcpb').text().replace(/\s\s+/g, '')
            const organizationName = $(el).find('.latcr').text().replace(/\s\s+/g, '')
            const title = $(el).find('.latceb').text().replace(/\s\s+/g, '')
            const qualification = $(el).find('.latcqb').text().replace(/\s\s+/g, '')
            const lastDate = $(el).find('.latclb').text().replace(/\s\s+/g, '')
            const applyLink = $(el).find('a').attr('href')

            const job = {
                createdAt,
                organizationName,
                title,
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