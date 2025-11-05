import { useState, createContext, useContext } from "react";
import { ComposerRequest } from '@/classes/requests-composer';

export const requestsComposerContext = createContext({});

export const useRequestsComposerContext = () => {
  return useContext(requestsComposerContext);
};

export const RequestsComposerContextProvider = ({ children }) => {
  const [requests, setRequests]                   = useState([]);
  const [modalShown, setModalShown]               = useState(false);
  const [preSubmitHandler, setPreSubmitHandler]   = useState(null);
  const [postSubmitHandler, setPostSubmitHandler] = useState(null);

  const requestsCount = requests.length;

  const pushRequests  = (...requests) => {
    setRequests(prev => {
      const newArr = [...prev];

      requests.forEach(request => {
        if(!(request instanceof ComposerRequest))
          throw new Error("requests must be of type ComposerRequest")

        newArr.push(request);
      });

      return newArr;
    });
  };

  const showModal     = () => setModalShown(true);
  const closeModal    = () => setModalShown(false);
  const removeRequest = (request, onEmpty = null) => {
    setRequests(prev => {
      const next = prev.filter(req => req != request);

      if(onEmpty instanceof Function && next.length <= 0)
        onEmpty();

      return next;
    })
  };

  const resetSubmitHandlers = () => {
    setPreSubmitHandler(null);
    setPostSubmitHandler(null);
  }

  const submitComposerRequests = () => {
    if(preSubmitHandler instanceof Function)
      preSubmitHandler();

    Promise.all(requests.map(request => {
      return request.request()
        .then(() => removeRequest(request, closeModal))
        .catch(err => request.fail(err.message));
    })).then(() => {
      if(postSubmitHandler instanceof Function)
        postSubmitHandler();
    });
  };

  const value = {
    requests,
    requestsCount,
    modalShown,
    showModal,
    closeModal,
    pushRequests,
    removeRequest,
    resetSubmitHandlers,
    setPreSubmitHandler,
    setPostSubmitHandler,
    submitComposerRequests,
  };

  return (
    <requestsComposerContext.Provider value={value}>
      {children}
    </requestsComposerContext.Provider>
  );
}
