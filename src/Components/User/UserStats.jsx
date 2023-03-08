import React from 'react'
import Head from '../Helper/Head'
import useFetch from '../../Hooks/useFetch'
import { STATS_GET } from '../../Api/Api'
import Loading from '../Helper/Loading'
import Error from '../Helper/Error'
const UserStatsGraphs = React.lazy(()=> import('./UserStatsGraphs')) //Só será importado quando for acessado no site

const UserStats = () => {
  const { loading, request, erro, data } = useFetch()

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET()
      await request(url, options)
    }

    getData()
  }, [request])

  if (loading) return <Loading />
  if (erro) return <Error error={erro} />
  if (data)
    return (
      //fallback = o que será carregado enquanto esse UserStatsGraphs nao é carregado, poderia ser o Loading
      <React.Suspense fallback={<div></div>}> 
        <Head title="Estatísticas" description="" />
        <UserStatsGraphs data={ data }/>
      </React.Suspense>
    )
  else return null
}

export default UserStats
