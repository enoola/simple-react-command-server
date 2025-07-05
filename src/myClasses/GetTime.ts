import e, { Request, Response } from "express";

class MyTimeObject {
    curTimestamp: number = 0
    curDate: string = 'YYYY/MM/DD'
    curTime: string = 'hh/mm/ss'

    constructor(){
        this.curTimestamp = Date.now();
        const now = new Date(this.curTimestamp);
        this.curDate = `${now.getFullYear()}/${now.getMonth()}/${now.getDay()}`
        this.curTime = `${now.getHours()}/${now.getMinutes()}/${now.getMinutes()}`
    }
}

export class GetTime {
    private curTime!: MyTimeObject;

    constructor(){
        this.curTime = new MyTimeObject();
    }
    
    SendAsJson(res: Response):boolean {
        try {
            res.json({
            timestamp: this.curTime?.curTimestamp,
            time: this.curTime?.curTime,
            date: this.curTime?.curDate

        });
    } catch (e) {
        console.log('ddd'+e)
        return false;
        }
    return ( true );
    }

    AsText():string {
        return ( this.curTime?.curDate );
    }

}