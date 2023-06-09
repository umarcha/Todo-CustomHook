import { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface useTodoResponse<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError<unknown> | null;
  fetchData: () => Promise<void>;
  postData: (requestData: T) => Promise<void>;
  patchData: (requestData: T) => Promise<void>;
  deleteData: () => Promise<void>;
  invalidateData: () => void;
}

const BASE_URL = "https://todo-backend.cyclic.app/"

const useTodo = <T,>(url: string, initialData: T | null = null): useTodoResponse<T> => {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError<unknown> | null>(null);

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      const response: AxiosResponse<T> = await axios.get<T>(`${BASE_URL}${url}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error);
      } else {
        setError(null);
      }
      setLoading(false);
    }
  };

  const postData = async (requestData: T): Promise<void> => {
    try {
      setLoading(true);
      const response: AxiosResponse<T> = await axios.post<T>(`${BASE_URL}${url}`, requestData);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error);
      } else {
        setError(null);
      }
      setLoading(false);
    }
  };

  const patchData = async (requestData: T): Promise<void> => {
    try {
      setLoading(true);
      const response: AxiosResponse<T> = await axios.patch<T>(`${BASE_URL}${url}`, requestData);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error);
      } else {
        setError(null);
      }
      setLoading(false);
    }
  };

  const deleteData = async (): Promise<void> => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}${url}`);
      setData(null);
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error);
      } else {
        setError(null);
      }
      setLoading(false);
    }
  };
  const invalidateData = (): void => {
    fetchData();
  };
  return { data, loading, error, fetchData, postData, patchData, deleteData, invalidateData };
};

export default useTodo;
