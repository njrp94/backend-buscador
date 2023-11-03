import { model } from 'mongoose';
import searchSchema from '../schemas/search.schema';

const Search = model('Search', searchSchema);

export default Search;
