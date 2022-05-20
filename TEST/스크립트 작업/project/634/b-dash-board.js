module.exports = async({ req, res, next, mongo, projectId }) => {
    try {

        console.log('--BUSAN--')
        const LOCAL_NUM = '2'; // 지역 2= 부산

        const sendData = {
            completeUserCnt:0,
            quotaAgeData:{
                age : [0,0,0,0],
                successData : [0,0,0,0],
            },
            quotaGenderData:{
                male:'0',
                female:'0'
            },
            qDataQ1_1: [0,0,0,0,0,0,0],
            qDataQ1_2: [0,0,0,0,0,0,0],
            qDataQ2 : [0,0,0,0,0,0,0,0],
            qDataQ3 : [0,0,0,0,0,0,0,0,0,0,0],
        }

        const questions = await mongo.db('getData').collection('QUESTION').find({_id:+projectId}).toArray();

        const ageQuotaData = await getAgeQuota(mongo,LOCAL_NUM);
        await setQAgeQuotaData(ageQuotaData,sendData);

        // TOTAL QUOTA
        const genderQuotaData = await getGenderQuota(mongo,LOCAL_NUM);
        await setGenderQuota(genderQuotaData,sendData);

        const q1_1Data = await getQ1_1Data(mongo,LOCAL_NUM);
        await setQ1_1Data(q1_1Data,sendData);

        const q1_2Data = await getQ1_2Data(mongo,LOCAL_NUM);
        await setQ1_2Data(q1_2Data,sendData);

        // Q2 DATA
        const [q2Data] = await getQ2Data(mongo,LOCAL_NUM);
        await setQ2Data(q2Data,sendData);

        // Q3 DATA
        const [q3Data] = await getQ3Data(mongo,LOCAL_NUM);
        await setQ3Data(q3Data,sendData);

        if(questions === null || questions === undefined) throw new Error('존재하지 않는 설문입니다.');

        return {
            result: true,
            ...sendData
        };
    } catch (e) {
        return {
            error: e
        }
    }
}

//COMPLETE
async function getGenderQuota(mongo,LOCAL_NUM){
    return await mongo.db('getData').collection('DATA_634').aggregate([
        {$match : { SQ1 : LOCAL_NUM }},
        {$group: {
                _id: '$SQ2',
                cnt: {$sum: 1}
            }},
        {$sort:{_id:1}}
    ]).toArray()
}

//COMPLETE
async function getAgeQuota(mongo,LOCAL_NUM){
    return await mongo.db('getData').collection('DATA_634').aggregate([
        {$match : { SQ1 : LOCAL_NUM }},
        {$group: {
                _id: '$SQ3_R',
                cnt: {$sum: 1}
            }},
        {$sort:{_id:1}}
    ]).toArray()
}

//COMPLETE
async function getQ1_1Data(mongo,LOCAL_NUM){
    return await mongo.db('getData').collection('DATA_634').aggregate([
        {$match : { SQ1 : LOCAL_NUM }},
        {$group: {
                _id: '$Q1_1',
                sum: {$sum: 1}
            }
        },
        {$sort:{_id:1}}
    ]).toArray()
}

//COMPLETE
async function getQ1_2Data(mongo,LOCAL_NUM){
    return await mongo.db('getData').collection('DATA_634').aggregate([
        {$match : { SQ1 : LOCAL_NUM }},
        {$group: {
                _id: '$Q1_2',
                sum: {$sum: 1}
            }
        },
        {$sort:{_id:1}}
    ]).toArray()
}

//COMPLETE
async function getQ2Data(mongo,LOCAL_NUM){
    return await mongo.db('getData').collection('DATA_634').aggregate([
        {$match : { SQ1 : LOCAL_NUM }},
        {
            $group : {
                _id : 'ALL' ,
                Q2_1 : { $avg : {$toInt : "$Q2_1"}},
                Q2_2 : { $avg : {$toInt : "$Q2_2"}},
                Q2_3 : { $avg : {$toInt : "$Q2_3"}},
                Q2_4 : { $avg : {$toInt : "$Q2_4"}},
                Q2_5 : { $avg : {$toInt : "$Q2_5"}},
                Q2_6 : { $avg : {$toInt : "$Q2_6"}},
                Q2_7 : { $avg : {$toInt : "$Q2_7"}},
                Q2_8 : { $avg : {$toInt : "$Q2_8"}},
            }
        },
        {$sort:{_id:1}}
    ]).toArray()
}

//COMPLETE
async function getQ3Data(mongo,LOCAL_NUM){
    return await mongo.db('getData').collection('DATA_634').aggregate([
        {$match : { SQ1 : LOCAL_NUM }},
        {
            $group : {
                _id : 'ALL' ,
                Q3_1 : { $avg : {$toInt : "$Q3_1"}},
                Q3_2 : { $avg : {$toInt : "$Q3_2"}},
                Q3_3 : { $avg : {$toInt : "$Q3_3"}},
                Q3_4 : { $avg : {$toInt : "$Q3_4"}},
                Q3_5 : { $avg : {$toInt : "$Q3_5"}},
                Q3_6 : { $avg : {$toInt : "$Q3_6"}},
                Q3_7 : { $avg : {$toInt : "$Q3_7"}},
                Q3_8 : { $avg : {$toInt : "$Q3_8"}},
                Q3_9 : { $avg : {$toInt : "$Q3_9"}},
                Q3_10 : { $avg : {$toInt : "$Q3_10"}},
                Q3_11: { $avg : {$toInt : "$Q3_11"}},
            }
        },
        {$sort:{_id:1}}
    ]).toArray()
}

//COMPLETE
async function setQAgeQuotaData(result,sendData){
    for(let i=0; i<=3; i++){
        if(result[i]?._id) {
            const ageIndex = +result[i]?._id-2;
            sendData.quotaAgeData.age[ageIndex] = result[i]?.cnt
            sendData.quotaAgeData.successData[ageIndex] = (result[i]?.cnt/99).toFixed(3)*100 +'%'
            sendData.completeUserCnt += result[i]?.cnt;
        }
    }
}

//COMPLETE
async function setGenderQuota(result,sendData){
    const [sumMale,sumFemale] = result;
    if(sumMale && !sumFemale){
        if(sumMale._id === '1'){
            sendData.quotaGenderData.male = sumMale.cnt;
        }else{
            sendData.quotaGenderData.female = sumFemale.cnt;
        }
    }else{
        sendData.quotaGenderData.male = sumMale.cnt;
        sendData.quotaGenderData.female = sumFemale.cnt;
    }
}

//COMPLETE
async function setQ2Data(qData,sendData){
    for(let i=1; i<=8; i++){
        sendData.qDataQ2[i-1] = qData['Q2_'+i].toFixed(1);
    }
}

//COMPLETE
async function setQ3Data(qData,sendData){
    for(let i=1; i<=11; i++){
        sendData.qDataQ3[i-1] = qData['Q3_'+i].toFixed(1);
    }
}

//COMPLETE
async function setQ1_1Data(qData,sendData){
    const completeCnt = sendData.completeUserCnt
    for(let i=0; i<=qData.length-1; i++){
        const q1Index = qData[i] && +qData[i]._id;
        sendData.qDataQ1_1[q1Index-1] = ((qData[i] && +qData[i].sum/completeCnt)*100).toFixed(1);
    }
}

//COMPLETE
async function setQ1_2Data(qData,sendData){
    const completeCnt = sendData.completeUserCnt
    for(let i=0; i<=qData.length-1; i++){
        const q1Index = qData[i] && +qData[i]._id;
        sendData.qDataQ1_2[q1Index-1] = ((qData[i] && +qData[i].sum/completeCnt)*100).toFixed(1);
    }
}
