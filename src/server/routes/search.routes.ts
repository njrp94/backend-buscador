import { Router } from 'express';
import { 
    searchReposAndUsers,
    getSearchHistory,
    deleteHistory,
    deleteSearchById,
    getSearchResultById,
    editSearch

} from "../../controllers/search.controller";
import generateToken from '../../middlewares/token.middleware';

const router = Router();

router.post('/search', generateToken, searchReposAndUsers);
router.get('/search/history', generateToken, getSearchHistory);
router.get('/search/history/:id', generateToken, getSearchResultById);
router.put('/search/:id', generateToken, editSearch);
router.delete('/search', generateToken, deleteHistory);
router.delete('/search/:id', generateToken, deleteSearchById);

export default router;
