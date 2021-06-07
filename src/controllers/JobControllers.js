const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

// -----------------------------------------------------------------------------------------------------------------------------
module.exports = {
  create(req, res) {
    return res.render("job"); // abre a págian "Job"
  },

  async save(req, res) {
    // Existia um ID: , mas agora o banco de dados autoincrementa o próprio id
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(), // atribuindo data de hoje
    });

    return res.redirect("/");
  },

  // Job/edit, informações corretas na página
  async show(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    const jobId = req.params.id; //exato nome da url

    const job = jobs.find((job) => Number(job.id) === Number(jobId));
    if (!job) {
      return res.send("Job not found!");
    }

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  async update(req, res) {
    const jobId = req.params.id; //exato nome da url
   
    const updatedJob = {
      //override
      name: req.body.name,
      "total-hours": req.body["total-hours"], //dados enviados do form front
      "daily-hours": req.body["daily-hours"],
    };

    await Job.update(updatedJob, jobId);

    res.redirect("/job/" + jobId);
  },

  async delete(req, res) {
    const jobId = req.params.id;
    await Job.delete(jobId);
    return res.redirect("/");
  },
};
