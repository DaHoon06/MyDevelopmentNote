import { NextFunction, Request, Response, Router } from 'express';
import { LOOKUP } from '../../controller/lookupController';

const router = Router();
const lc = new LOOKUP.lookupController();

router.get('/revenue', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pageNo: pn, perPage: pp, keyword: kw, dataType: dt, mainProduct: mp, year: y } = req.query;

        const pageNo = pn ? (+pn || 1) : 1;
        const perPage = pp ? (+pp || 12) : 12;

        const keyword = kw ? kw.toString() : '';
        const dataType = dt ? dt.toString() : '';
        const mainProduct = mp ? mp.toString() : '';
        const year = y ? y.toString() : '';

        const { result, totalPage, list } = await lc.revenue({ pageNo, perPage }, { keyword, year, mainProduct }, dataType);

        return res.json({
            list,
            totalPage,
            result
        });
    } catch (e) {
        return res.json({
            result: false,
            error: e.message
        });
    }
});

router.get('/worker', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pageNo: pn, perPage: pp, keyword: kw, dataType: dt, mainProduct: mp, year: y } = req.query;

        const pageNo = pn ? (+pn || 1) : 1;
        const perPage = pp ? (+pp || 12) : 12;

        const keyword = kw ? kw.toString() : '';
        const dataType = dt ? dt.toString() : '';
        const mainProduct = mp ? mp.toString() : '';
        const year = y ? y.toString() : '';

        const { result, totalPage, list } = await lc.worker({ pageNo, perPage }, { keyword, year, mainProduct }, dataType);

        return res.json({
            list,
            totalPage,
            result
        });
    } catch (e) {
        return res.json({
            result: false,
            error: e.message
        });
    }
});

router.get('/material', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pageNo: pn, perPage: pp, keyword: kw, dataType: dt, mainProduct: mp, year: y } = req.query;

        const pageNo = pn ? (+pn || 1) : 1;
        const perPage = pp ? (+pp || 12) : 12;

        const keyword = kw ? kw.toString() : '';
        const dataType = dt ? dt.toString() : '';
        const mainProduct = mp ? mp.toString() : '';
        const year = y ? y.toString() : '';
        const { result, totalPage, list } = await lc.material({ pageNo, perPage }, { keyword, year, mainProduct }, dataType);

        return res.json({
            list,
            totalPage,
            result
        });
    } catch (e) {
        return res.json({
            result: false,
            error: e.message
        });
    }
});

router.get('/production', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pageNo: pn, perPage: pp, keyword: kw, dataType: dt, mainProduct: mp, year: y } = req.query;

        const pageNo = pn ? (+pn || 1) : 1;
        const perPage = pp ? (+pp || 12) : 12;

        const keyword = kw ? kw.toString() : '';
        const dataType = dt ? dt.toString() : '';
        const mainProduct = mp ? mp.toString() : '';
        const year = y ? y.toString() : '';
        const { result, totalPage, list } = await lc.production({ pageNo, perPage }, { keyword, year, mainProduct }, dataType);

        return res.json({
            list,
            totalPage,
            result
        });
    } catch (e) {
        return res.json({
            result: false,
            error: e.message
        });
    }
});

router.get('/export', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pageNo: pn, perPage: pp, keyword: kw, dataType: dt, mainProduct: mp, year: y } = req.query;

        const pageNo = pn ? (+pn || 1) : 1;
        const perPage = pp ? (+pp || 12) : 12;

        const keyword = kw ? kw.toString() : '';
        const dataType = dt ? dt.toString() : '';
        const mainProduct = mp ? mp.toString() : '';
        const year = y ? y.toString() : '';
        const { result, totalPage, list } = await lc.export({ pageNo, perPage }, { keyword, year, mainProduct }, dataType);

        return res.json({
            list,
            totalPage,
            result
        });
    } catch (e) {
        return res.json({
            result: false,
            error: e.message
        });
    }
});

router.get('/rice-prod', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pageNo: pn, perPage: pp, keyword: kw, dataType: dt, year: y } = req.query;

        const pageNo = pn ? (+pn || 1) : 1;
        const perPage = pp ? (+pp || 12) : 12;

        const keyword = kw ? kw.toString() : '';
        const dataType = dt ? dt.toString() : '';
        const year = y ? y.toString() : '';
        const { result, totalPage, list } = await lc.riceProd({ pageNo, perPage }, { keyword, year }, dataType);

        return res.json({
            list,
            totalPage,
            result
        });
    } catch (e) {
        return res.json({
            result: false,
            error: e.message
        });
    }
});

router.get('/rice-sale', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pageNo: pn, perPage: pp, keyword: kw, dataType: dt, year: y } = req.query;

        const pageNo = pn ? (+pn || 1) : 1;
        const perPage = pp ? (+pp || 12) : 12;

        const keyword = kw ? kw.toString() : '';
        const dataType = dt ? dt.toString() : '';
        const year = y ? y.toString() : '';
        const { result, totalPage, list } = await lc.riceSale({ pageNo, perPage }, { keyword, year }, dataType);

        return res.json({
            list,
            totalPage,
            result
        });
    } catch (e) {
        return res.json({
            result: false,
            error: e.message
        });
    }
});

router.get('/revenue/excel', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // return res.end();
        const { keyword: kw, dataType: dt, mainProduct: mp, year: y } = req.query;

        const keyword = kw ? kw.toString() : '';
        const dataType = dt ? dt.toString() : '';
        const mainProduct = mp ? mp.toString() : '';
        const year = y ? y.toString() : '';

        const binary = await lc.revenueExcel({ keyword, year, mainProduct }, dataType);
        const fileName = `company_list_${new Date().getTime()}.xlsx`;

        res.attachment(fileName)
        res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

        return res.end(binary);
    } catch (e) {
        console.log(e)
        return res.send(e.message);
    }
})

router.get('/worker/excel', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // return res.end();
        const { keyword: kw, dataType: dt, mainProduct: mp, year: y } = req.query;

        const keyword = kw ? kw.toString() : '';
        const dataType = dt ? dt.toString() : '';
        const mainProduct = mp ? mp.toString() : '';
        const year = y ? y.toString() : '';

        const binary = await lc.workerExcel({ keyword, year, mainProduct }, dataType);
        const fileName = `company_list_${new Date().getTime()}.xlsx`;

        res.attachment(fileName)
        res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

        return res.end(binary);
    } catch (e) {
        console.log(e)
        return res.send(e.message);
    }
})

router.get('/material/excel', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // return res.end();
        const { keyword: kw, dataType: dt, mainProduct: mp, year: y } = req.query;

        const keyword = kw ? kw.toString() : '';
        const dataType = dt ? dt.toString() : '';
        const mainProduct = mp ? mp.toString() : '';
        const year = y ? y.toString() : '';

        const binary = await lc.materialExcel({ keyword, year, mainProduct }, dataType);
        const fileName = `company_list_${new Date().getTime()}.xlsx`;

        res.attachment(fileName)
        res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

        return res.end(binary);
    } catch (e) {
        console.log(e)
        return res.send(e.message);
    }
})

router.get('/production/excel', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // return res.end();
        const { keyword: kw, dataType: dt, mainProduct: mp, year: y } = req.query;

        const keyword = kw ? kw.toString() : '';
        const dataType = dt ? dt.toString() : '';
        const mainProduct = mp ? mp.toString() : '';
        const year = y ? y.toString() : '';

        const binary = await lc.productionExcel({ keyword, year, mainProduct }, dataType);
        const fileName = `company_list_${new Date().getTime()}.xlsx`;

        res.attachment(fileName)
        res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

        return res.end(binary);
    } catch (e) {
        console.log(e)
        return res.send(e.message);
    }
})

router.get('/export/excel', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // return res.end();
        const { keyword: kw, dataType: dt, mainProduct: mp, year: y } = req.query;

        const keyword = kw ? kw.toString() : '';
        const dataType = dt ? dt.toString() : '';
        const mainProduct = mp ? mp.toString() : '';
        const year = y ? y.toString() : '';

        const binary = await lc.exportExcel({ keyword, year, mainProduct }, dataType);
        const fileName = `company_list_${new Date().getTime()}.xlsx`;

        res.attachment(fileName)
        res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

        return res.end(binary);
    } catch (e) {
        console.log(e)
        return res.send(e.message);
    }
})

router.get('/rice-prod/excel', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // return res.end();
        const { keyword: kw, dataType: dt, year: y } = req.query;

        const keyword = kw ? kw.toString() : '';
        const dataType = dt ? dt.toString() : '';
        const year = y ? y.toString() : '';

        const binary = await lc.riceProdExcel({ keyword, year }, dataType);
        const fileName = `company_list_${new Date().getTime()}.xlsx`;

        res.attachment(fileName)
        res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

        return res.end(binary);
    } catch (e) {
        console.log(e)
        return res.send(e.message);
    }
})

router.get('/rice-sale/excel', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // return res.end();
        const { keyword: kw, dataType: dt, year: y } = req.query;

        const keyword = kw ? kw.toString() : '';
        const dataType = dt ? dt.toString() : '';
        const year = y ? y.toString() : '';

        const binary = await lc.riceSaleExcel({ keyword, year }, dataType);
        const fileName = `company_list_${new Date().getTime()}.xlsx`;

        res.attachment(fileName)
        res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

        return res.end(binary);
    } catch (e) {
        console.log(e)
        return res.send(e.message);
    }
})

export default router;