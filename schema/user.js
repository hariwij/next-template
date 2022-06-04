import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    /*    Genaral Props   */
    firstname: {
      type: String,
      //required: [true, 'Please provide a first name.'],
      default: '',
    },
    lastname: {
      type: String,
      //required: [true, 'Please provide a last name.'],
      default: '',
    },
    public_name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
      default: '',
      unique: true,
    },
    mobile: {
      type: [String],
      default: [],
    },

    /*    Personal Info Props   */
    dob: {
      type: Date,
      default: new Date(1950, 1, 1),
    },
    gender: {
      type: Number,
      default: 0,
    },
    country: {
      type: String,
      default: 'US',
    },
    state: {
      type: String,
      default: 'none',
    },
    city: {
      type: String,
      default: 'none',
    },
    nationality: {
      type: String,
      default: 'none',
    },

    /*    Profile Props   */
    about_description: {
      type: String,
      default: '',
    },
    profile_content: {
      type: String,
      default: '',
    },
    socialmedia_profiles: {
      type: Array,
    },
    profile_picture: {
      type: String,
      default: '',
    },
    profile_cover: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    additionl_info: {
      type: [
        {
          heading: {
            type: String,
            default: '',
          },
          content: {
            type: [
              {
                subject: {
                  type: String,
                  default: '',
                },
                description: {
                  type: [String],
                  default: [],
                },
              },
            ],
            default: [],
          },
          priority: {
            type: Number,
            default: 0,
            min: [0, 'Priority cannot be less than 0'],
            max: [3, 'Priority cannot be more than 3'],
          },
        },
      ],
      default: [],
    },

    /*    Special Props   */
    usertype: {
      type: String,
      default: '',
    },
    is_verified_account: {
      type: Boolean,
      default: false,
    },
    working_companies: {
      type: Array,
      default: [],
    },
    current_company: {
      type: String,
      default: '',
    },

    current_position: {
      type: String,
      default: '',
    },
    community: {
      type: String,
      default: '',
    },
    career_stage: {
      type: String,
      default: '',
    },
    /*    Firebase Props   */
    firebaseId: {
      type: String,
      unique: true,
    },

    /*    Other Props   */
    watched_events: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Event',
      default: [],
    },
    subscribed_to_news_feed: {
      type: Boolean,
      default: false,
    },
    email_notifications: {
      type: Boolean,
      default: true,
    },
    notifications: {
      type: [
        {
          title: {
            type: String,
            default: '',
            maxlength: [40, 'Notification Title cannot be more than 40 characters'],
          },
          message: {
            type: String,
            default: '',
            maxlength: [200, 'Notification Message cannot be more than 200 characters'],
          },
          date: {
            type: Date,
            default: Date.now,
          },
          type: {
            // ex: warining, success, error, info
            type: String,
            default: '',
          },
          url: {
            type: String,
            default: '',
          },
        },
      ],
      default: [],
    },
    messagerooms: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'ChatRoom',
      default: [],
    },
    currentjobcount: {
      type: Number,
      default: 0,
    },
    maxjobs: {
      type: Number,
      default: 0,
    },
    currenteventcount: {
      type: Number,
      default: 0,
    },
    maxevents: {
      type: Number,
      default: 0,
    },

    /*   Statics Props   */
    statics: {
      views: {
        type: Number,
        default: 0,
      },
      likes: {
        type: Number,
        default: 0,
      },
      clicks: {
        type: Number,
        default: 0,
      },
      shares: {
        type: Number,
        default: 0,
      },
    },
    /*    Dev Props   */
    userStatus: {
      type: Number,
      default: 0,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    is_suspended: {
      type: Boolean,
      default: false,
    },
    admincode: {
      type: Number,
      default: 0,
    },

    password_change_history: {
      type: [
        {
          date: {
            type: Date,
            default: Date.now,
          },
          old_password: {
            type: String,
            default: '',
          },
          verified: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
    account_state_history: {
      type: [
        {
          from: {
            type: String,
            default: '',
          },
          to: {
            type: String,
            default: '',
          },
          date: {
            type: Date,
            default: Date.now,
          },
          by: {
            type: String,
            default: '',
          },
        },
      ],
      default: [],
    },
  },
  {timestamps: true}
)

UserSchema.statics.updateAnalytics = async function (id, statics) {
  if (!statics['views']) statics['views'] = 0
  if (!statics['likes']) statics['likes'] = 0
  if (!statics['clicks']) statics['clicks'] = 0
  if (!statics['shares']) statics['shares'] = 0
  const res = await this.findByIdAndUpdate(
    id,
    {
      $inc: {
        'statics.views': statics.views,
        'statics.likes': statics.likes,
        'statics.clicks': statics.clicks,
        'statics.shares': statics.shares,
      },
    },
    {new: true}
  )
  return res
}

UserSchema.statics.bulkAddUsers = async function (users) {
  const res = await this.insertMany(users)
  return res
}

export default mongoose.models.User || mongoose.model('User', UserSchema)
