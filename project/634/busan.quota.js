
module.exports = async({ req, res, next, mongo, projectId }) => {
    try {
        const SNUM = '634'; // 652로 수정해야함
        const LocalNum = '2';
        //문항 1 2 3 초기 값 설정
        const Q1 = {
            Q_1: [0,0,0,0,0,0,0],
            Q_2: [0,0,0,0,0,0,0],

        }
        //남여비율
        const genderData = await SQ2(mongo,LocalNum);
        const cnt = genderData['0'].cnt + genderData['1'].cnt;
        //연령별
        const generationRatio = await SQ3(mongo,LocalNum);
        //응답 평균
        const total = await totalSuccess(cnt,generationRatio);

        const q1_1 = await Q1_1(mongo,LocalNum,Q1);
        const q1_2 = await Q1_2(mongo,LocalNum,Q1);

        const test = await dataTest(mongo,LocalNum);

        return {
            gender: [
                genderData['0'].cnt,
                genderData['1'].cnt],
            age: [
                generationRatio['0'].cnt,
                generationRatio['1'].cnt,
                generationRatio['2'].cnt,
                generationRatio['3'].cnt,
            ],
            total: total,
            q1: q1_1,
            q2: q1_2,
        };
    } catch (e) {
        return {
            error: e
        }
    }
}


//남여 비율
async function SQ2 (mongo,LocalNum) {
    return mongo.db('getData').collection('DATA_634').aggregate([
        {$match: {SQ1: LocalNum}}, //일본에 맞춰서 변경
        {
            $group: {
                _id: "$SQ2", //해당 그룹에 맟춰서 남 여 총합을 구함
                cnt: {$sum: 1}
            }
        },
        {$sort: {'_id': 1}},
    ]).toArray();
}

//연령
async function SQ3(mongo,LocalNum){
    return mongo.db('getData').collection('DATA_634').aggregate([
        {$match: {SQ1: LocalNum}},
        {
            $group: {
                _id: '$SQ3_R',
                cnt: {$sum: 1}
            }
        },
        {$sort: {'_id': 1}}
    ]).toArray();
}

async function totalSuccess(cnt,generationRatio){
    //배열을 만들어서 넘길까
    let result1 = Math.round(generationRatio['0'].cnt / 99 * 100);
    let result2 = Math.round(generationRatio['1'].cnt / 99 * 100);
    let result3 = Math.round(generationRatio['2'].cnt / 99 * 100);
    let result4 = Math.round(generationRatio['3'].cnt / 99 * 100);

    return {
        result1,
        result2,
        result3,
        result4
    };
}

async function Q1_1(mongo,LocalNum,Q1){
    let data1 = [];
    const q1_1 = mongo.db('getData').collection('DATA_634').aggregate([
        {$match: {SQ1: LocalNum}},
        {
            $group: {
                _id: '$Q1_1',
                cnt: {$sum: 1}
            }
        },
        {$sort: {'_id': 1}}
    ]).toArray();

    for(let i=0;i<q1_1.length;i++){
        if(!q1_1[i]){
            data1.push(0);
        }
        data1.push(q1_1[i].cnt);
    }
    return data1;
}

async function Q1_2(mongo,LocalNum,Q1){
    let index = 1;
    const q1_2 = mongo.db('getData').collection('DATA_634').aggregate([
        {$match: {SQ1: LocalNum}},
        {
            $group: {
                _id: '$Q1_2',
                cnt: {$sum: 1}
            }
        },
        {$sort: {'_id': 1}}
    ]).toArray();


    for(let i=0;i<q1_2.length;i++){
        //1부터 시작
        if(q1_2[i]._id !== index){
            Q1.Q_2[i] = 0;
            index++;
        }
        Q1.Q_2[i] = q1_2[i].cnt;
    }
    console.log(Q1.Q_2);
    return Q1.Q_2;
}

async function dataTest(mongo){
    return mongo.db('getData').collection('DATA_634').aggregate([
        // {$match : { SQ1 : '2' }},
        // {$group: {
        //         _id: {
        //             'gender' : '$SQ2',
        //             'generation': '$SQ3_R',
        //         },
        //         total: {$sum:1}
        //     }}
        {$match : { SQ1 : '2' }},
        {$group: {
                _id: {
                    'gender': {
                        $cond: {
                            if: {$eq: ['$SQ2','1']},then:'male',else:'female'}
                    },
                    'generation': '$SQ3_R',
                },
                total: {$sum:1}
            }},
    ]).toArray();
}




