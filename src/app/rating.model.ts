export class Rating {
    constructor(
        public user_id: number,
        public form_status: string,
        public date_time: string,
        public email: string,
        public rating1 : number,
        public rating2 : number,
        public rating3 : number,
        public rating4 : number,
        public rating5 : number,
        public rating6 : number,
        public rating7 : number,
        public rating8 : number,
        public rating9 : number,
        public rating10 : number,
        public comment1 : string,
        public comment2 : string,
        public comment3 : string,
        public comment4 : string,
        public comment5 : string,
        public comment6 : string,
        public comment7 : string,
        public comment8 : string,
        public comment9 : string,
        public comment10 : string,
        public user_projects? : any

         ) {}
}