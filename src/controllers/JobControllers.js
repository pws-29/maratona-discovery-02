const Job = require("../model/Job");
const JobUtils = require("../utils/JobUtils");
const Profile = require("../model/Profile");

// -----------------------------------------------------------------------------------------------------------------------------
module.exports = {
  create(req, res) {
    return res.render("job"); // abre a págian "Job"
  },

  save(req, res) {
    const jobs = Job.get(0);

    // ref req.body { name: 'sf', 'daily-hours': '5', 'total-hours': '2' }
    const lastId = jobs[jobs.length - 1]?.id || 0;

    jobs.push({
      id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(), // atribuindo data de hoje
    });
    return res.redirect("/");
  },

  // Job/edit, informações corretas na página
  show(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();

    const jobId = req.params.id; //exato nome da url

    const job = jobs.find((job) => Number(job.id) === Number(jobId));
    if (!job) {
      return res.send("Job not found!");
    }

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

    return res.render("job-edit", { job });
  },

  update(req, res) {
    const jobs = Job.get();

    const jobId = req.params.id; //exato nome da url

    const job = jobs.find((job) => Number(job.id) === Number(jobId)); //joga na constante
    if (!job) {
      return res.send("Job not found!");
    }

    const updatedJob = {
      // expalhando o job correspondete do ID
      ...job,
      //override
      name: req.body.name,
      "total-hours": req.body["total-hours"], //dados enviados do form front
      "daily-hours": req.body["daily-hours"],
    };

    const newJobs = jobs.map((job) => {
      // updating job
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }

      return job;
    });

    Job.update(newJobs);

    res.redirect("/job/" + jobId);
  },

  delete(req, res) {
    const jobId = req.params.id;
    Job.delete(jobId);
    return res.redirect("/");
  },
};
