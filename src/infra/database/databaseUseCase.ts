export interface DatabaseUseCase {
    connect(urlConnetion:string): Promise<Boolean>;
    disconnect(): Promise<Boolean>;
    isConnected(): Promise<Boolean>;
}