import { Router } from 'express';
import { 
    searchReposAndUsers,
    getSearchHistory,
    deleteHistory,
    deleteSearchById
    
} from "../../controllers/search.controller";

const router = Router();

router.get('/search', searchReposAndUsers);
router.get('/search/history', getSearchHistory);
router.delete('/search', deleteHistory);
router.delete('/search/:id', deleteSearchById);

export default router;
