import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Peer from "peerjs";
export interface CallUser {
  peerId: string;
  stream: MediaStream;
}
@Injectable()
export class PeerService {
  public peer:any;
  public myPeerId: any;
  public joinUser = new BehaviorSubject<CallUser|null>(null);
  public leaveUser = new BehaviorSubject<string|null>(null);
  public localStream: any;
  constructor(private http: HttpClient) { }

  getTurnServeConfig(): Observable<any> {
    return this.http.put('https://global.xirsys.net/_turn/MyFirstApp', null,
      {
        headers: new HttpHeaders(
          { "Authorization": "Basic " + btoa("datnikon:f0f2a8b6-b7f9-11eb-9b35-0242ac150003") }
        )
      })
  }

  public openPeer(stream: MediaStream): Promise<string> {
    return new Promise<string>((resolve) => {
      this.getTurnServeConfig().subscribe(data => {
        this.initPeer(data.v);
        this.peer.on('open', (uerPeerId: string) => {
          this.myPeerId = uerPeerId
          this.handleInComingCall(stream);
          resolve(uerPeerId);
        })
      })
    });
  }

  public call(anotherPeerId: string, stream: MediaStream): void {
    var call = this.peer.call(anotherPeerId, stream);
    this.handelCall(call, anotherPeerId);
  }

  public handelCall(call: any, anotherPeerId: string): void {
    call.on('stream', (anotherStream: any) => {
      this.joinUser.next({ peerId: anotherPeerId, stream: anotherStream });
    })
  }

  private handleInComingCall(stream: MediaStream): void {
    this.peer.on('call', (call:any) => {
      call.answer(stream);
      call.on('stream', (anotherStream: any) => {
        this.joinUser.next({ peerId: call.peer, stream: anotherStream });
      })
    })
  }

  private initPeer(config: any): void {
    this.peer = new Peer(this.myPeerId);
  }

}
