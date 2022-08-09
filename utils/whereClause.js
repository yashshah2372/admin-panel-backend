// base - Project.find()

//bigQ - //search=bangalore&page=2&locality=bangalorecentral&area[gte]=900
// &price[lte]=15000&price[gte]=1000

class WhereClause{
    constructor(base, bigQ){
        this.base = base;
        this.bigQ = bigQ;
    }

    //------NO USE OF THIS COMMENTED CODE-------
    // db.junk.createIndex(
    //     { "title": "text", "suburb": "text" },
    //     { "weights": {  "title": 10 } }
    //  )
    //  db.junk.find(
    //     { "$text": { "$search": "Hello World Melbourne" } },
    //     { "score": { "$meta": "textScore" } }
    //  ).sort({ "score": { "$meta": "textScore" } })
     
    search(){
        const searchword = this.bigQ.search ? {
            
            projectname: {
                $regex: this.bigQ.search,
                $options: 'i'
            },
            // projectdescription: {
            //     $regex: this.bigQ.search,
            //     $options: 'i'
            // },
            projectlocality: {
                $regex: this.bigQ.search,
                $options: 'i'
            },
            buildername: {
                $regex: this.bigQ.search,
                $options: 'i'
            },
        
        }:{}

        this.base = this.base.find({...searchword})
        return this;
    }

    filter(){
        const copyQ = { ...this.bigQ };

        delete copyQ["search"];
        delete copyQ["limit"];
        delete copyQ["page"];

        //convert bigQ into a string => copyQ
        let stringOfCopyQ = JSON.stringify(copyQ);

        stringOfCopyQ = stringOfCopyQ.replace(
            /\b(gte|lte|gt|lt)\b/g,
            (m) => `$${m}`
        );

        const jsonOfCopyQ = JSON.parse(stringOfCopyQ);

        this.base = this.base.find(jsonOfCopyQ);
            return this;
    }


    pager(resultperPage){
        let currentPage = 1;
        if(this.bigQ.page){
            currentPage = this.bigQ.page
        }

        const skipVal = resultperPage * (currentPage-1);

        this.base = this.base.limit(resultperPage).skip(skipVal);
        return this;
    }
}

module.exports = WhereClause;