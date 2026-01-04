const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../../utils/mongoose.plugins');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    tags: [{
      type: String,
      trim: true,
    }],
  },
  {
    timestamps: true,
  }
);

// Add plugins
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

/**
 * Check if title is taken
 * @param {string} title - The post's title
 * @param {ObjectId} [excludePostId] - The id of the post to be excluded
 * @returns {Promise<boolean>}
 */
postSchema.statics.isTitleTaken = async function (title, excludePostId) {
  const post = await this.findOne({ title, _id: { $ne: excludePostId } });
  return !!post;
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
