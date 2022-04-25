module.exports = async ({ req, res, nest, mongo }) => {
    const { type = '1', SNUM } = req.body;
    try {
        if(type === '1') {
            return type1(SNUM);
        } else if(type === '2') {
            const ADD3 = '2';
            return cell(SNUM, ADD3);
        } else {
            const ADD3 = '1';
            return cell(SNUM, ADD3);
        }
    } catch (e) {
        return {
            result: false,
            error: e
        }
    }

    async function type1(SNUM) {
        const client = await mongo.db('getData').collection('ANSWER').aggregate([
            {$match: { SNUM: +SNUM, COMPLETE: 'COMPLETE' }},
            {
                $addFields: {

                }
            }
        ]);
    }

    async function cell(SNUM, ADD3) {

    }

};

