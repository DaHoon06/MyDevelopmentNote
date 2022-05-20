module.exports = async({ req, res, next, mongo, projectId }) => {
    try {
        const sendData = {
            completeUserCnt: 0,
            quotaData: {
                male: [0,0,0,0],
                maleSuccessData: [0,0,0,0],
                female: [0,0,0,0],
                femaleSuccessData: [0,0,0,0],
            },
            quotaGenderData: {
                male: '0',
                female: '0',
            },
            qDataQ1_1: [0,0,0,0,0,0,0],
            qDataQ1_2: [0,0,0,0,0,0,0],
            qDataQ2: [0,0,0,0,0,0,0,0],
            qDataQ3: [0,0,0,0,0,0,0,0,0,0,0],
        }

        const questions = await mongo.db('getData').collection('QUESTION').find({_id:+projectId}).toArray();

        // 성별 및 연령대별 분류
        const genderQuotaData = await getGenderAgeQuota(mongo);
        await setGenderAgeQuota(genderQuotaData,sendData); // sendData의 주소값을 넘겼기 때문에 set함수 안에서 return이 필요없다.

        // Chart Data Q1_1 ~ 2
        const q1_1Data = await getQ1_1Data(mongo);
        await setQ1_1Data(q1_1Data,sendData);

        const q1_2Data =await getQ1_2Data(mongo);
        await setQ1_2Data(q1_2Data,sendData);

        // Chart Data Q2
        const [q2Data] = await getQ2Data(mongo); // 배열로 받기 위하여 [변수명]
        await setQ2Data(q2Data,sendData);

        // Chart Data Q3
        const [q3Data] = await getQ3Data(mongo);
        await setQ3Data(q3Data,sendData);
        //Error Handling
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
//------    Getter    -------
async function getGenderAgeQuota (mongo){
    return mongo.db('getData').collection('DATA_652').aggregate([
        {
            $group: {
                _id: {
                    gender: {
                        $cond: {if: {$eq: ["$SQ2", '1']}, then: 'male', else: 'female'}
                    },
                    age: '$SQ3_R'
                },
                cnt: {$sum: 1}
            }
        },
        {$sort: {'_id.gender': 1, '_id.age': 1}}
    ]).toArray();
}
async function getQ1_1Data(mongo){
    return mongo.db('getData').collection('DATA_652').aggregate([
        {
            $group: {
                _id: '$Q1_1',
                sum: {$sum: 1}
            }
        },
        {$sort: {_id: 1}}
    ]).toArray();
}
async function getQ1_2Data(mongo){
    return mongo.db('getData').collection('DATA_652').aggregate([
        {
            $group: {
                _id: '$Q1_2',
                sum: {$sum: 1}
            }
        },
        {$sort: {_id: 1}}
    ]).toArray();
}
async function getQ2Data(mongo){
    return mongo.db('getData').collection('DATA_652').aggregate([
        {
            $group: {
                _id: 'ALL',
                Q2_1: {$avg: {$toInt: "$Q2_1"}},
                Q2_2: {$avg: {$toInt: "$Q2_2"}},
                Q2_3: {$avg: {$toInt: "$Q2_3"}},
                Q2_4: {$avg: {$toInt: "$Q2_4"}},
                Q2_5: {$avg: {$toInt: "$Q2_5"}},
                Q2_6: {$avg: {$toInt: "$Q2_6"}},
                Q2_7: {$avg: {$toInt: "$Q2_7"}},
                Q2_8: {$avg: {$toInt: "$Q2_8"}},
            }
        },
        {$sort: {_id: 1}}
    ]).toArray();
}
async function getQ3Data(mongo){
    return mongo.db('getData').collection('DATA_652').aggregate([
        {
            $group: {
                _id: 'ALL',
                Q3_1: {$avg: {$toInt: "$Q3_1"}},
                Q3_2: {$avg: {$toInt: "$Q3_2"}},
                Q3_3: {$avg: {$toInt: "$Q3_3"}},
                Q3_4: {$avg: {$toInt: "$Q3_4"}},
                Q3_5: {$avg: {$toInt: "$Q3_5"}},
                Q3_6: {$avg: {$toInt: "$Q3_6"}},
                Q3_7: {$avg: {$toInt: "$Q3_7"}},
                Q3_8: {$avg: {$toInt: "$Q3_8"}},
                Q3_9: {$avg: {$toInt: "$Q3_9"}},
                Q3_10: {$avg: {$toInt: "$Q3_10"}},
                Q3_11: {$avg: {$toInt: "$Q3_11"}},
            }
        },
        {$sort: {_id: 1}}
    ]).toArray();
}


//------    Setter    -------
async function setGenderAgeQuota(genderQuotaData,sendData){
    for(let i of sendData){
        const gender = i._id.gender;
        const age = i._id.age;
        const cnt = i._id.cnt;

        switch (gender){
            case 'male':
                sendData.quotaData.male[age-2] = cnt; //현 세대의 인덱스 값에 총합을 추가.
                sendData.quotaData.maleSuccessData[age-2] = (cnt / 99).toFixed(3) * 100;
                sendData.completeUserCnt += cnt;
                break;
            case 'female':
                sendData.quotaData.female[age-2] = cnt; //마찬가지.
                sendData.quotaData.femaleSuccessData[age-2] = (cnt / 99).toFixed(3) * 100;
                sendData.completeUserCnt += cnt;
                break;
            default:
                console.log('---------------');
                break;
        }
    }
}
async function setQ1_1Data(q1_1Data,sendData){
    const completeCnt = sendData.completeUserCnt;
    // 해당 데이터의 총합을 구해야한다. ( 백분율 )
    for(let i = 0; i < q1_1Data.length; i++){
        const q1_1Index = q1_1Data[i] && +q1_1Data[i]._id; // 현재 값이 존재하는 인덱스를 구한다.
        sendData.qDataQ1_1[q1_1Index - 1] = ((q1_1Data[i] && +q1_1Data[i].sum / completeCnt) * 100).toFixed(1);
    }
}
async function setQ1_2Data(q1_2Data,sendData){
    const completeCnt = sendData.completeUserCnt;
    for(let i = 0; i < q1_2Data.length; i++){
        const q1_2Index = q1_2Data[i] && +q1_2Data[i]._id;
        sendData.qDataQ1_2[q1_2Index - 1] = ((q1_2Data[i] && +q1_2Data[i].sum / completeCnt) * 100).toFixed(1);
    }

}
async function setQ2Data(q2Data,sendData){
    for(let i = 1; i <= 8; i++){ // 8문항
        sendData.qDataQ2[i - 1] = q2Data['Q2_'+i].toFixed(3); // 각 문항의 값 저장
    }
}
async function setQ3Data(q3Data,sendData){
    for(let i = 1; i <= 11; i++){
        sendData.qDataQ3[i - 1] = q3Data['Q3_'+i].toFixed(3);
    }
}