import { useState } from 'react'
import { useApi } from '../hooks/useAPI'
import { useAlert } from '../contexts/AlertContext'
import type { HttpMethod } from '../types'
import { Header } from '../components/Header'
import { Sidebar } from '../components/sidebar'
import { RequestPanel } from '../components/request-panel'
import { ResponsePanel } from '../components/response-panel'
import { SaveRequestModal } from '../components/save-request-modal'
import { AlertContainer } from '../components/AlertContainer'

export default function App() {
  const { response, isLoading, sendRequest } = useApi()

  const [method, setMethod] = useState<HttpMethod>('GET')
  const [baseUrl, setBaseUrl] = useState('')
  const [endpoint, setEndpoint] = useState('')
  const [headers, setHeaders] = useState<Record<string, string>>({})
  const [body, setBody] = useState('')
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

  const handleSendRequest = () => {
    const fullUrl = `${baseUrl}${endpoint}`
    sendRequest({
      method,
      url: fullUrl,
      headers,
      body
    })
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />

      {/* <div className="flex flex-1 overflow-hidden">
        <Sidebar
          collections={[]}
          onLoadRequest={() => { }}
          onDeleteRequest={() => { }}
          onDeleteCollection={() => { }}
        /> */}

      <main className="flex max-[700px]:flex-col flex-1 overflow-hidden">
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
      {/* </div> */}

      <SaveRequestModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={() => { }}
        onSaveMultiple={() => { }}
        currentUrl={`${baseUrl}${endpoint}`}
        currentMethod={method}
        currentHeaders={headers}
        currentBody={body}
        collections={[]}
      />
      <AlertContainer />
    </div>
  )
}
