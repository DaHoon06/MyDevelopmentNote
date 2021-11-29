import { NextFunction, Request, Response, Router } from 'express';
import { UPLOAD } from '../../controller/uploadController';

const router = Router();
const uc = new UPLOAD.UploadController();

router.get('/prod/list/:companyId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { companyId } = req.params
        const { pageNo: pn, perPage: pp } = req.query

        const pageNo = pn ? +pn : 1;
        const perPage = pp ? +pp : 15;

        const { result, list, totalPage } = await uc.getUploadList({ pageNo, perPage, companyId });

        return res.json({ result, list, totalPage });
    } catch (e) {
        return res.json({
            result: false,
            error: e.message
        });
    }
});

router.get('/prod/:companyId/:prodId?', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { companyId, prodId } = req.params
        const { result, imageInfo, prodInfo } = await uc.getUploadInfo({ companyId, prodId });

        return res.json({ result, imageInfo, prodInfo });
    } catch (e) {
        return res.json({
            result: false,
            error: e.message
        });
    }
});

router.post('/prod/:companyId/:prodId?', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { companyId, prodId } = req.params
        const { uploadedImageCount, uploadImageInfo: imageInfo, prodInfo } = req.body;

        await uc.upload({ prodInfo, imageInfo, uploadedImageCount, companyId, prodId });

        return res.json({ result: true });
    } catch (e) {
        return res.json({
            result: false,
            error: e.message
        });
    }
});

router.delete('/prod/:companyId/:prodId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { companyId, prodId } = req.params
        await uc.deleteProduct({ companyId, prodId });

        return res.json({ result: true });
    } catch (e) {
        return res.json({
            result: false,
            error: e.message
        });
    }
});
router.delete('/image/:companyId/:prodId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { companyId, prodId } = req.params
        const { key } = req.body;

        await uc.deleteImage({ companyId, prodId, key });

        return res.json({ result: true });
    } catch (e) {
        return res.json({
            result: false,
            error: e.message
        });
    }
});

router.get('/s3', async (req: Request, res: Response, next: NextFunction) => {
    const result = uc.getS3Info()
    return res.json({
        ...result
    })
})

export default router;