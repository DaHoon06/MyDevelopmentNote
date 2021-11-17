
module.exports = async({ req, res, next, mongo, projectId }) => {
    try {
        //TEST
        const SNUM = '634'; // 652로 수정해야함
        const LocalNum = 2+'';
        //문항 1 2 3 초기 값 설정
        const answerData = {
            Q1: [0,0,],
            Q2: [0,0,0,0,0,0,0,0,0],
            Q3: [0,0,0,0,0,0,0,0,0,0,0]
        }

        //필요한 함수 => 1. 남여 비율
        //             2. 연령대에 따른 참여율 ( 남 여 구분 )

        const genderData = await SQ2(mongo,SNUM);
        console.log(genderData['0'].cnt, '남 여 따로 합');

        return {
            gender : [
                genderData['0'].cnt,
                genderData['1'].cnt],
        };
    } catch (e) {
        return {
            error: e
        }
    }

    async function SQ2 (mongo,SNUM) {
        return  await mongo.db('getData').collection('DATA_634').aggregate([
            {$match: {SQ1:"2"}}, //일본에 맞춰서 변경
            {$group:{
               _id : "$SQ2", //해당 그룹에 맟춰서 남 여 총합을 구함
               cnt : { $sum:1 }
            }}
        ]).toArray();

    }

    async function SQ3(){

    }
}


