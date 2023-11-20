import { Request, Response } from 'express';
import Search from '../models/search.model';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';


// Buscar en GitHub
export const searchReposAndUsers = async (req, res) => {
    const { keyword } = req.body;

    try {
        const reposResponse = await axios.get(`https://api.github.com/search/repositories?q=${keyword}`);
        const usersResponse = await axios.get(`https://api.github.com/search/users?q=${keyword}`);

        const repos = reposResponse.data.items;
        const users = usersResponse.data.items;
        const token = res.locals.token;

        const decoded = jwt.verify(token, 'secretToken');

        const search = new Search({
            term: keyword,
            timestamp: new Date(),
            sessionId: decoded.sessionId,
        });

        await search.save();

        res.json({ repos, users, token });
        
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };

// acceder al historial de busqueda
export const getSearchHistory = async (req, res) => {

    try {
        const token = res.locals.token;
        const decoded = jwt.verify(token, 'secretToken');
        const searchHistory = await Search.find({ sessionId: decoded.sessionId }, 'term timestamp').sort({ timestamp: -1 });

        res.json(searchHistory);

    } catch (error) {
        res.status(500).json({ message: error.message });
        }
    };
    

// borrar el historial
export const deleteHistory = async (req, res) => {
    
    try {
        const token = res.locals.token;
        const decoded = jwt.verify(token, 'secretToken');
        await Search.deleteMany({ sessionId: decoded.sessionId });

        res.json({ message: "Se borró el historial de búsqueda." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    
    }
};

// borrar un resultado del historial en particular
export const deleteSearchById = async (req, res) => {
    const searchId = req.params.id;
    try {
        await Search.findByIdAndDelete(searchId);
        res.json({ message: "La búsqueda ha sido eliminada." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
