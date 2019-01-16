import HTMLTransformer from '~server/helpers/HTMLTransformer'
import ssr from './ssr'

export const getAppRouter = async (req, res) => {
  const { content, preloadState } = await ssr(req)

  const data = {
    title: 'IDAREOU',
    content,
    preloadState
  }

  HTMLTransformer(data)
    .then(currentView =>
      res.send(currentView))
    .catch(err =>
      res.status(500).send(err))
}