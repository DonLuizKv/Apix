import { useState } from 'react'
import { Header } from '../components/header'
import { Sidebar } from '../components/sidebar'
import { RequestPanel } from '../components/request-panel'
import { ResponsePanel } from '../components/response-panel'
import { SaveRequestModal } from '../components/save-request-modal'
import { AlertContainer } from '../components/AlertContainer'
import { useAlert } from '../contexts/AlertContext'
import type { Collection, Request, HttpMethod, ResponseData } from '../types'

export default function App() {
  const { showAlert } = useAlert()
  const [collections, setCollections] = useState<Collection[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('apix-collections')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [method, setMethod] = useState<HttpMethod>('GET')
  const [baseUrl, setBaseUrl] = useState('')
  const [endpoint, setEndpoint] = useState('')
  const [headers, setHeaders] = useState<Record<string, string>>({})
  const [body, setBody] = useState('')
  const [response, setResponse] = useState<ResponseData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

  const handleSendRequest = async () => {
    const fullUrl = `${baseUrl}${endpoint}`

    if (!fullUrl) {
      showAlert('warning', 'Por favor ingresa una URL válida')
      return
    }

    setIsLoading(true)
    const startTime = Date.now()

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      }

      if (method !== 'GET' && method !== 'HEAD' && body) {
        options.body = body
      }

      const res = await fetch(fullUrl, options)
      const responseHeaders: Record<string, string> = {}
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })

      const responseTime = Date.now() - startTime
      const contentType = res.headers.get('content-type')
      let responseBody: any

      if (contentType?.includes('application/json')) {
        responseBody = await res.json()
      } else {
        responseBody = await res.text()
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        time: responseTime,
        headers: responseHeaders,
        body: responseBody,
      })

      if (res.ok) {
        showAlert('success', `Petición exitosa (${res.status})`, undefined, 2000)
      } else {
        showAlert('error', `Error en la petición (${res.status})`, undefined, 3000)
      }
    } catch (error) {
      setResponse({
        status: 0,
        statusText: 'Error',
        time: Date.now() - startTime,
        headers: {},
        body: error instanceof Error ? error.message : 'Request failed',
      })
      showAlert('error', error instanceof Error ? error.message : 'Error al realizar la petición')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadRequest = (request: Request, collectionBaseUrl: string) => {
    setMethod(request.method)
    setBaseUrl(collectionBaseUrl)
    setEndpoint(request.endpoint)
    setHeaders(request.headers || {})
    setBody(JSON.stringify(request.body || '', null, 2))
  }

  const handleSaveRequest = (collectionName: string, requestName: string, requestMethod?: HttpMethod) => {
    const existingCollection = collections.find(c => c.name === collectionName)

    const newRequest: Request = {
      id: Date.now().toString() + Math.random(), // ID único para cada petición
      name: requestName,
      method: requestMethod || method, // Usar el método pasado o el actual
      endpoint, // Guardar el endpoint
      headers,
      body: body ? JSON.parse(body) : undefined,
      createdAt: new Date().toISOString(),
    }

    let updatedCollections: Collection[]

    if (existingCollection) {
      updatedCollections = collections.map(c =>
        c.name === collectionName
          ? { ...c, requests: [...c.requests, newRequest] }
          : c
      )
    } else {
      const newCollection: Collection = {
        id: Date.now().toString(),
        name: collectionName,
        baseUrl, // Guardar la base URL en la colección
        requests: [newRequest],
      }
      updatedCollections = [...collections, newCollection]
    }

    setCollections(updatedCollections)
    localStorage.setItem('apix-collections', JSON.stringify(updatedCollections))
    showAlert('success', 'Petición guardada correctamente')
  }

  const handleSaveMultipleRequests = (collectionName: string, requests: Array<{ name: string, method: HttpMethod }>) => {
    requests.forEach((req, index) => {
      // Pequeño delay entre cada guardado para evitar IDs duplicados
      setTimeout(() => {
        handleSaveRequest(collectionName, req.name, req.method)
      }, index * 10)
    })
    showAlert('success', `${requests.length} peticiones guardadas correctamente`)
    setIsSaveModalOpen(false)
  }

  const handleDeleteRequest = (collectionId: string, requestId: string) => {
    const updatedCollections = collections.map(c => {
      if (c.id === collectionId) {
        return {
          ...c,
          requests: c.requests.filter(r => r.id !== requestId)
        }
      }
      return c
    }).filter(c => c.requests.length > 0)

    setCollections(updatedCollections)
    localStorage.setItem('apix-collections', JSON.stringify(updatedCollections))
    showAlert('info', 'Petición eliminada')
  }

  const handleDeleteCollection = (collectionId: string) => {
    const updatedCollections = collections.filter(c => c.id !== collectionId)
    setCollections(updatedCollections)
    localStorage.setItem('apix-collections', JSON.stringify(updatedCollections))
    showAlert('info', 'Colección eliminada')
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          collections={collections}
          onLoadRequest={handleLoadRequest}
          onDeleteRequest={handleDeleteRequest}
          onDeleteCollection={handleDeleteCollection}
        />

        <main className="flex max-md:flex-col flex-1 overflow-hidden">
          <RequestPanel
            method={method}
            baseUrl={baseUrl}
            endpoint={endpoint}
            headers={headers}
            body={body}
            isLoading={isLoading}
            onMethodChange={setMethod}
            onBaseUrlChange={setBaseUrl}
            onEndpointChange={setEndpoint}
            onHeadersChange={setHeaders}
            onBodyChange={setBody}
            onSend={handleSendRequest}
            onSave={() => setIsSaveModalOpen(true)}
          />

          <ResponsePanel response={response} />
        </main>
      </div>

      <SaveRequestModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveRequest}
        onSaveMultiple={handleSaveMultipleRequests}
        currentUrl={`${baseUrl}${endpoint}`}
        currentMethod={method}
        currentHeaders={headers}
        currentBody={body}
        collections={collections}
      />
      <AlertContainer />
    </div>
  )
}
