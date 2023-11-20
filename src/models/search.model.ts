import { model, Document } from 'mongoose';
import SearchSchema from '../schemas/search.schema';

export interface SearchDocument extends Document {
  term: string;
  timestamp: Date;
  results: string;
  sessionId: string;
}

const Search = model<SearchDocument>('Search', SearchSchema);

export default Search;
