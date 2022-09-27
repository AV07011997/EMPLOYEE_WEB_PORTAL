import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import multer from "multer"


// const upload = multer({dest:'uploads/'})


var storage = multer.diskStorage({
    destination: (req, file, cb) =>{

        //ensure that this folder already exists in your project directory
        cb(null, "uploads/");
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
});



const upload = multer({storage: storage})



const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())





mongoose.connect("mongodb://localhost:27017/myloginDB" , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})


const userSchema = mongoose.Schema({
    userid: String,
    password: String,
})


const personalinfoSchema = mongoose.Schema({
    employee_code : String,
    full_name :  String,
    gender : String,
    marital_status : String,
    fathers_name : String,
    mothers_name : String,
    contact_number : String, 
    personal_email_id : String,
    dob : String,
    blood_group : String,
    permanent_Address : String,
    
    current_address : String,
    state: String

 
   



})
const documentsinfoSchema = mongoose.Schema({
    aadhar_no : String,
    // upload_aadhar : String,
    pan_no: String,
    // upload_pan: String,
    passport_no :String, 
    passport_issue_place : String,
    passport_issue_date : String,
    passport_expiry_date : String,
    bank_name : String,
    bank_account_no : String,
    ifsc_code: String,

})



const educationinfoSchema = mongoose.Schema({
    phd_field:String,
    phd_research_topic:String,
    university: String,
    university_place: String,
    phd_tenure: String,
    pg_branch: String,
    pg_degree_university: String,
    pg_place:String,
    pg_percentage_cgpa: String,
    ug_branch: String,
    ug_university:String,
    ug_place:String,
    ug_percentage_cgpa:String,
    matriculation_board: String,
    if_state_board:String,
    matriculation_school_name:String,
    school_place: String,
    matriculation_percentage_cgpa: String,
    intermediate_board: String,
    intermediate_state_board_if:String,
    intermediate_school_name:String,
    intermediate_school_place: String,
    intermediate_percentage_cgpa: String,

})

const officeinfoSchema = mongoose.Schema({
    designation:String,
    doj:String,
    office_location:String,
    official_email_id:String,
    reference_person_name:String,
    designation_of_person:String,
    how_do_you_know_about_this_job:String
})

const previousinfoSchema= mongoose.Schema({

    last_company_name1:String,
    designation1: String,
    doj1: String,
    dol1: String,
    last_company_name2: String,
    designation2: String,
    doj2: String,
    dol2: String,
    last_company_name3: String,
    designation3: String,
    doj3: String,
    dol3: String,
    last_company_name4: String,
    designation4: String,
    doj4: String,
    dol4: String,
    last_company_name5: String,
    designation5: String,
    doj5: String,
    dol5: String

})

const User = new mongoose.model("User",userSchema)

const PersonalDetails = new mongoose.model("PersonalDetails", personalinfoSchema)

const Documents = new mongoose.model("Documents", documentsinfoSchema)

const Education = new mongoose.model("Education",educationinfoSchema)

const OfficeDetails = new mongoose.model("OfficeDetails",officeinfoSchema)
const PreviousDetails = new mongoose.model("PreviousDetails",previousinfoSchema)





// Routes

app.post("/login", (req,res)=> {


    const {userid,password} = req.body

    const user= new User({
        userid:userid,
        password:password
    })
    
    User.findOne({userid: userid}, (err, user) =>{
        if(user){
            if(password=== user.password){

                res.send({message: "Login is Successfull", user: user})
            } else {
                res.send({ message: "Password is incorrect"},null)
            }
            
        } else {
            res.send({message: "User not registered"})
        }
    })

})

app.post("/personaldetails", (req,res)=> {

    const {employee_code, full_name,gender,marital_status,fathers_name,mothers_name,contact_number, dob,age,place_of_birth,current_address,current_city ,current_district,state, current_pincode, permanent_address, permanent_city, permanent_district, permanent_state , permanent_pincode ,personal_email_id,skype_id , linkedin_handle , blood_group , emergency_contact_person ,relationship, emergency_contact_no } = req.body

    console.log(fathers_name)
    const personalInfo= new PersonalDetails ({

        employee_code : employee_code,
        full_name :  full_name  ,
        gender : gender,
        marital_status : marital_status,
        fathers_name : fathers_name,
        mothers_name : mothers_name,
        contact_number : contact_number, 
        dob : dob,
        // age : age,
        // place_of_birth : place_of_birth,
        current_address : current_address,
        // current_city : current_city,
        // current_district : current_district,
        // current_state : current_state,
        // current_pincode : current_pincode,
        permanent_address : permanent_address,
        // permanent_city : permanent_city,
        // permanent_district : permanent_district,
        // permanent_state : permanent_state ,
        // permanent_pincode : permanent_pincode,
        personal_email_id : personal_email_id ,
        // skype_id : skype_id,
        // linkedin_handle : linkedin_handle,
        blood_group : blood_group,
        state:state
        // emergency_contact_person : emergency_contact_person,
        // relationship : relationship,
        // emergency_contact_no : emergency_contact_no,   
    })
// console.log(personalInfo)

    personalInfo.save(function(err, Details) {
        if (err){
            res.send(err)
        }
        else{
            res.send({message: "Personal Details successfully saved!"})
        }
    })
})





app.post('/api/image',upload.single('image'),(req,res)=>{
    console.log(req.file)
    if(!req.file){
        res.send({code:500, msg:'error : file not selected'})

    }else{
        res.send({code:200,msg:'upload successfull'})
    }
})

app.post('/api/image1',upload.single('image1'),(req,res)=>{
    console.log(req.file)
    if(!req.file){
        res.send({code:500, msg:'error : file not selected'})

    }else{
        res.send({code:200,msg:'upload successfull'})
    }
})

app.post("/documentation", (req,res)=> {
    const {aadhar_no,upload_aadhar, pan_no,upload_pan , passport_no, passport_issue_place,passport_issue_date,passport_expiry_date, bank_name, bank_account_no, ifsc_code } = req.body

    const documentsInfo= new Documents ({
            
        aadhar_no :aadhar_no ,
        
        pan_no: pan_no,
        
        passport_no :passport_no, 
        passport_issue_place : passport_issue_place,
        passport_issue_date : passport_issue_date,
        passport_expiry_date :passport_expiry_date ,
        bank_name :bank_name ,
        bank_account_no :bank_account_no ,
        ifsc_code:ifsc_code 
    })

    documentsInfo.save(function(err, result) {
        if (err){
            res.send(err)
        }
        else{
            res.send({message: "Documents Details successfully saved!"})
        }
    })
})



app.post("/education", (req,res)=> {
    const { phd_field,phd_research_topic,university,university_place, phd_tenure,pg_branch ,pg_degree_university, pg_place,pg_percentage_cgpa,ug_branch,ug_university,ug_place, ug_percentage_cgpa,matriculation_board,if_state_board, matriculation_school_name,school_place,matriculation_percentage_cgpa , intermediate_board ,intermediate_state_board_if,intermediate_school_name,intermediate_school_place , intermediate_percentage_cgpa} = req.body

    const educationInfo= new Education ({
    
        phd_field:phd_field,
        phd_research_topic:phd_research_topic,
        university: university,
        university_place: university_place,
        phd_tenure: phd_tenure,
        pg_branch:pg_branch ,
        pg_degree_university: pg_degree_university,
        pg_place:pg_place,
        pg_percentage_cgpa: pg_percentage_cgpa,
        ug_branch: ug_branch ,
        ug_university: ug_university,
        ug_place:ug_place,
        ug_percentage_cgpa:ug_percentage_cgpa,
        matriculation_board: matriculation_board,
        if_state_board:if_state_board,
        matriculation_school_name:matriculation_school_name,
        school_place:school_place ,
        matriculation_percentage_cgpa:matriculation_percentage_cgpa ,
        intermediate_board:intermediate_board ,
        intermediate_state_board_if:intermediate_state_board_if,
        intermediate_school_name:intermediate_school_name,
        intermediate_school_place:intermediate_school_place ,
        intermediate_percentage_cgpa: intermediate_percentage_cgpa,
            
        
    })
    

    educationInfo.save(function(err,result) {
        if (err){
            res.send(err)
        }
        else{
            res.send({message: "Education Details successfully saved!"})
        }
    })
})



app.post("/officedetails", (req,res)=> {
    const {designation,doj,office_location,official_email_id,reference_person_name,designation_of_person,how_do_you_know_about_this_job } = req.body

    const officeInfo= new OfficeDetails ({
        designation:designation,
        doj:doj,
        office_location:office_location,
        official_email_id:official_email_id,
        reference_person_name:reference_person_name,
        designation_of_person:designation_of_person,
        how_do_you_know_about_this_job:how_do_you_know_about_this_job

            
        
    })

    officeInfo.save(function(err, result) {
        if (err){
            res.send(err)
        }
        else{
            res.send({message: "Office Details successfully saved!"})
        }
    })
})


app.post("/previousemployment", (req,res)=> {
    const {last_company_name1,designation1,doj1,dol1, last_company_name2, designation2,doj2,dol2, last_company_name3,designation3,doj3,dol3,last_company_name4,designation4, doj4,dol4,last_company_name5,designation5,doj5,dol5} = req.body

    const previousInfo= new PreviousDetails ({
        last_company_name1:last_company_name1,
        designation1:designation1,
        doj1:doj1,
        dol1:dol1,
        last_company_name2:last_company_name2,
        designation2:designation2,
        doj2:doj2,
        dol2: dol2,
        last_company_name3:last_company_name3,
        designation3:designation3,
        doj3:doj3,
        dol3:dol3,
        last_company_name4:last_company_name4,
        designation4:designation4,
        doj4:doj4,
        dol4:dol4,
        last_company_name5:last_company_name5,
        designation5:designation5,
        doj5:doj5,
        dol5:dol5
    
            
        
    })

    previousInfo.save(function(err,result) {
        if (err){
            res.send(err)
        }
        else{
            res.send({message: "Previous Employee Details successfully saved!"})
        }
    })
})
app.listen(9002,()=> {
    console.log("BE  started at port 9002")
})

