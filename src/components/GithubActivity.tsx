import { useState, useEffect } from 'react';
import { FaGithub, FaCodeBranch, FaStar, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { GoRepoPush, GoGitPullRequest, GoIssueOpened } from "react-icons/go";
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface GithubEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: {
    action?: string;
    ref_type?: string;
    commits?: { message: string }[];
  };
  created_at: string;
}

const GithubActivity = () => {
  return (
    <section id="github-activity" className="py-20">
dddvdv      
    </section>
  );
};

export default GithubActivity;
