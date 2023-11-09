import cron from 'cron';
import Membership from '../models/MembershipSchema.js';

const job = new cron.CronJob('0 0 * * *', async () => {
  // This job runs every day at midnight

  const currentDate = new Date();

  // Find memberships where the end date is less than the current date
  const expiredMemberships = await Membership.find({ endDate: { $lt: currentDate } });

  if (expiredMemberships.length > 0) {
    // Delete expired memberships
    for (const membership of expiredMemberships) {
      await Membership.findByIdAndDelete(membership._id);
    }
    console.log(`${expiredMemberships.length} expired memberships deleted.`);
  } else {
    console.log('No expired memberships found.');
  }
});

job.start();
