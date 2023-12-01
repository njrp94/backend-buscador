import { Request, Response } from 'express';
import Search from '../models/search.model';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';


export const searchReposAndUsers = async (req, res) => {
    const { keyword } = req.body;

    try {
        const reposResponse = await axios.get(`https://api.github.com/search/repositories?q=${keyword}`);
        const usersResponse = await axios.get(`https://api.github.com/search/users?q=${keyword}`);

        const repos = reposResponse.data.items;
        const users = usersResponse.data.items;
        const { sessionId, jwt } = res.locals.token;

        const search = new Search({
            term: keyword,
            timestamp: new Date(),
            sessionId: sessionId,
            results: { repos, users },
        });

        await search.save();

        res.json({repos, users });

      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };

// acceder al historial de busqueda
export const getSearchHistory = async (req, res) => {
  try {
    const { sessionId } = res.locals.token;
    const searchHistory = await Search.find({ sessionId }, 'term timestamp results').sort({ timestamp: -1 });

    if (searchHistory.length === 0) {
      return res.status(404).json({ message: 'No hay búsquedas en tu historial' });
    }

    res.json(searchHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


    
 // editar busqueda especifica
 export const editSearch = async (req: Request, res: Response) => {
    const searchId = req.params.id;
    const { newTerm } = req.body;
  
    try {
      const search = await Search.findById(searchId);
      search.term = newTerm;
      const updatedSearch = await search.save();

      res.json({ message: 'Búsqueda editada exitosamente.', updatedSearch });

    } catch (error) {
      res.status(500).json({ message: 'Búsqueda no encontrada.' });
    }
  };


// borrar el historial
export const deleteHistory = async (req, res) => {
    
    try {
        const token = res.locals.token;
        await Search.deleteMany({ sessionId: token.sessionId });

        res.json({ message: "Se borró el historial de búsqueda." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    
    }
};

// borrar una busqueda especifica
export const deleteSearchById = async (req, res) => {
    const searchId = req.params.id;
    try {
        await Search.findByIdAndDelete(searchId);
        res.json({ message: "La búsqueda ha sido eliminada." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
